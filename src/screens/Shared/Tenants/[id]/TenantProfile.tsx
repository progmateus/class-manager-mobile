import { Button } from "@components/Button";
import { PageHeader } from "@components/PageHeader";
import { Actionsheet, Box, Center, HStack, Heading, Icon, Image, Link, ScrollView, Text, VStack, View } from "native-base";
import { TouchableOpacity, Vibration } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { CreateTenantImageService, DeleteTenantImageService, GetTenantProfileService } from "src/services/tenantsService";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useAuth } from "@hooks/useAuth";
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO";
import { Avatar } from "@components/Avatar/Avatar";
import { TenantProfileSkeleton } from "@components/skeletons/screens/TenantProfile";
import { dataTagSymbol, useQuery, useQueryClient } from "@tanstack/react-query";
import { FacebookLogo, Images, InstagramLogo, Plus, PlusCircle, TrashSimple, WhatsappLogo, X } from "phosphor-react-native";
import { THEME } from "src/theme";
import { ILinkDTO } from "@dtos/tenants/ILinkDTO";
import { ELinkType } from "src/enums/ELinkType";
import { ITenantProfileDTO } from "@dtos/tenants/ITenantProfileDTO";
import { EAuthType } from "src/enums/EAuthType";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { HasRole } from "@utils/HasRole";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { fireInfoToast, fireSuccesToast } from "@utils/HelperNotifications";


type RouteParamsProps = {
  tenantIdParams: string;
}

export function TenantProfile() {

  const route = useRoute()

  const navigation = useNavigation<UserNavigatorRoutesProps>();
  const tenantNavigation = useNavigation<TenantNavigatorRoutesProps>();

  const { tenant, authenticationType, authenticateTenant } = useAuth();
  let tenantId = tenant?.id;

  if (authenticationType == EAuthType.USER) {
    const { tenantIdParams } = route.params as RouteParamsProps;
    tenantId = tenantIdParams;
  }

  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImageId, setSelectedImageId] = useState("")
  const queryClient = useQueryClient();
  const { sizes } = THEME

  const loadTenantProfile = async () => {
    try {
      const { data } = await GetTenantProfileService(tenantId)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: tenantProfile, isLoading } = useQuery<ITenantProfileDTO>({
    queryKey: ['get-tenant-profile', tenantId],
    queryFn: loadTenantProfile
  })

  const handleSubscribe = () => {
    navigation.navigate('createSubscription', {
      tenantIdParams: tenantId
    })
  }


  const subscriptionExists = useMemo(() => {
    if (!user.subscriptions || user.subscriptions?.length == 0 || !tenantProfile) {
      return null
    }
    return user.subscriptions.find((s: ISubscriptionPreviewDTO) => s.tenantId === tenantProfile.id && s.status !== ESubscriptionStatus.CANCELED)
  }, [tenantProfile, user.subscriptions])


  const handleNavigateSubscription = () => {
    if (!subscriptionExists) return
    navigation.navigate('subscriptionProfile', {
      tenantIdParams: tenantId,
      subscriptionId: subscriptionExists.id
    })
  }

  const tranformSocialIcon = (number: number): Element => {
    const icons: any = {
      1: <WhatsappLogo size={sizes['10']} />,
      2: <InstagramLogo size={sizes['10']} />,
      3: <FacebookLogo size={sizes['10']} />
    }
    return icons[number];
  }


  const getLinkHref = (link: ILinkDTO): string => {
    if (link.type == ELinkType.WHATSAPP) {
      return `https://wa.me/${link.url}`
    }
    return !link.url.startsWith('https://') ? `https://${link.url}` : link.url
  }

  const handlePressEditTenant = () => {
    tenantNavigation.navigate('updateTenant')
  }

  const isTenantLogged = useMemo(() => {
    if (!tenantProfile) {
      return
    }
    return authenticationType == EAuthType.TENANT && tenantProfile.id == tenant?.id
  }, [tenantProfile])

  const isTenantAdmin = useMemo(() => {
    if (!tenantProfile) {
      return false
    }
    return HasRole(user.usersRoles, tenantProfile.id, ["admin"])
  }, [tenantProfile])


  const handleSignInTenant = () => {
    if (!tenantProfile) {
      return
    }
    authenticateTenant(tenantProfile.id)
  }

  const handleClickAddImage = async () => {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true
    })

    if (photoSelected.canceled) return

    if (photoSelected.assets[0].uri) {
      const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
      handleAddImage(photoSelected.assets[0])
    } else {
      return
    }
  }


  const handleAddImage = async (image: ImagePicker.ImagePickerAsset) => {
    const fileExtension = image.uri.split('.').pop()
    const avatarFile = {
      name: `${tenant.name}.${fileExtension}`.toLowerCase(),
      uri: image.uri,
      type: `${image.type}/${fileExtension}`
    } as any

    const userAvatarUploadForm = new FormData();
    userAvatarUploadForm.append('image', avatarFile)

    CreateTenantImageService(tenantId, userAvatarUploadForm).then(async ({ data }) => {
      await queryClient.invalidateQueries({
        queryKey: ['get-tenant-profile', tenantId]
      })
      fireSuccesToast('Imagem adicionada com sucesso!')
    })
  }


  const handleDeleteImage = () => {
    DeleteTenantImageService(tenantId, selectedImageId).then(async () => {
      fireInfoToast('Imagem removida com sucesso')
      setSelectedImageId("")
      setIsOpen(false)
      await queryClient.setQueryData(['get-tenant-profile', tenantId], (oldData: ITenantProfileDTO) => {
        return { ...oldData, images: oldData.images.filter(x => x.id !== selectedImageId) }
      })
    })
  }

  const handleLongPressImage = (imageId: string) => {
    if (!isTenantAdmin) return
    Vibration.vibrate(100)
    setSelectedImageId(imageId)
    setIsOpen(true)
  }

  return (
    <View flex={1}>
      <PageHeader title="Perfil" />
      <ScrollView>
        {
          isLoading || !tenantProfile
            ?
            (
              <TenantProfileSkeleton />
            )
            :
            (
              <VStack>
                <Center mt={8}>
                  <Avatar
                    rounded="full"
                    w={24}
                    h={24}
                    alt="image profile"
                    src={tenantProfile.avatar}
                  />

                  <Heading mt={4} fontSize="xl">{tenantProfile.name}</Heading>
                  <Text fontSize="sm">@{tenantProfile.username}</Text>
                  {
                    isTenantLogged ? (
                      <Button title="EDITAR PERFIL" variant="outline" mt={6} w="1/2" h={10} fontSize="xs" onPress={handlePressEditTenant} />
                    ) : isTenantAdmin ? (
                      <Button title="ENTRAR" mt={6} w="1/2" h={10} fontSize="xs" onPress={handleSignInTenant} />
                    ) : (
                      subscriptionExists ?
                        (
                          <Button title="INSCRITO" variant="outline" mt={6} w="1/2" h={10} fontSize="xs" onPress={handleNavigateSubscription} />

                        ) :
                        (
                          <Button title="INSCREVA-SE" mt={6} w="1/2" h={10} fontSize="xs" onPress={handleSubscribe} />
                        )
                    )
                  }

                  <HStack mt={6} space={2}>
                    {
                      tenantProfile.links && tenantProfile.links.length > 0 && (
                        tenantProfile.links.map((link) => {
                          return (
                            <TouchableOpacity key={link.id}>
                              <Link href={getLinkHref(link)}>
                                <Icon as={tranformSocialIcon(link.type)} color="coolGray.800" />
                              </Link>
                            </TouchableOpacity>
                          )
                        })
                      )
                    }
                  </HStack>
                </Center>
                {
                  tenantProfile.description && (
                    <View px={4} mt={4}>
                      {/* <Text color="coolGray.500" fontSize="md" mb={2}>Bio</Text> */}
                      <Text>{tenantProfile.description}</Text>
                    </View>
                  )
                }
                <View mt={2} py={4} borderBottomWidth={0.5} borderBottomColor="coolGray.400">
                  <Center>
                    <Icon as={<Images size={18} />} />
                  </Center>
                </View>
                <View flex={1} justifyContent="end" display="flex" flexDirection="row" flexWrap="wrap">
                  {
                    tenantProfile.images && tenantProfile.images.length > 0 && (
                      tenantProfile.images.map((image) => {
                        return (
                          <TouchableOpacity key={image.id} onLongPress={() => handleLongPressImage(image.id)}>
                            <Image
                              w="32"
                              h="32"
                              alt="image profile"
                              source={{
                                uri: image.url,
                              }}
                              defaultSource={{ uri: image.url }}
                              mt={0.5}
                              ml={0.5}
                            />
                          </TouchableOpacity>

                        )
                      })
                    )
                  }
                  {
                    (!tenantProfile.images || tenantProfile.images.length < 9) && isTenantAdmin && (
                      <TouchableOpacity onPress={handleClickAddImage}>
                        <View w="32" h="32" alignItems="center" justifyContent="center" mt={0.5} ml={0.5} bgColor="muted.100">
                          <Icon as={<PlusCircle size={40} weight="light" />} color="brand.500" />
                        </View>
                      </TouchableOpacity>
                    )
                  }
                </View>
                <Actionsheet isOpen={isOpen} size="full" onClose={() => setIsOpen(false)}>
                  <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                      <Heading fontSize="16" color="coolGray.600" textAlign="center">
                        Gerenciar imagem
                      </Heading>
                    </Box>
                    <Actionsheet.Item onPress={handleDeleteImage} startIcon={<Icon as={TrashSimple} size="6" name="cancel" color="red.600" />}>
                      <Text fontSize="16" color="red.600"> Excluir imagem</Text>
                    </Actionsheet.Item>
                  </Actionsheet.Content>
                </Actionsheet>
              </VStack >
            )
        }
      </ScrollView >
    </View >
  );
}