import { Button } from "@components/Button";
import { PageHeader } from "@components/PageHeader";
import { Center, HStack, Heading, Icon, Image, Link, ScrollView, Text, VStack, View } from "native-base";
import ImageSVG from "@assets/image-outline.svg"
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo } from "react";
import { CreateTenantImageService, GetTenantProfileService } from "src/services/tenantsService";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useAuth } from "@hooks/useAuth";
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO";
import { Avatar } from "@components/Avatar/Avatar";
import { TenantProfileSkeleton } from "@components/skeletons/screens/TenantProfile";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FacebookLogo, InstagramLogo, Plus, PlusCircle, WhatsappLogo } from "phosphor-react-native";
import { THEME } from "src/theme";
import { ILinkDTO } from "@dtos/tenants/ILinkDTO";
import { ELinkType } from "src/enums/ELinkType";
import { ITenantProfileDTO } from "@dtos/tenants/ITenantProfileDTO";
import { EAuthType } from "src/enums/EAuthType";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { HasRole } from "@utils/HasRole";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { fireSuccesToast } from "@utils/HelperNotifications";


type RouteParamsProps = {
  tenantIdParams: string;
}

export function TenantProfile() {
  const images = [
    { url: "https://img.freepik.com/fotos-gratis/jovem-jogadora-de-volei-isolada-na-parede-branca-mulher-em-equipamentos-de-esporte-e-sapatos-ou-tenis-treinando-e-praticando-conceito-de-esporte-estilo-de-vida-saudavel-movimento-e-movimento_155003-28111.jpg?ga=GA1.1.1603704743.1686338071&semt=sph" },
    { url: "https://img.freepik.com/fotos-gratis/garota-posando-com-bola-de-volei_23-2149450980.jpg?ga=GA1.1.1603704743.1686338071&semt=sph" },
    { url: "https://img.freepik.com/fotos-premium/detalhe-do-volei-de-praia-machos-na-rede_798657-11849.jpg?ga=GA1.1.1603704743.1686338071&semt=sph" },
    { url: "https://img.freepik.com/fotos-premium/mulher-jovem-jogando-volei-isolada-em-um-fundo-amarelo-sorrindo-e-mostrando-sinal-de-vitoria_1368-418813.jpg?ga=GA1.1.1603704743.1686338071&semt=sph" },
    { url: "https://img.freepik.com/fotos-gratis/meninas-jogando-volei_23-2149450964.jpg?ga=GA1.1.1603704743.1686338071&semt=sph" },
    { url: "https://img.freepik.com/fotos-gratis/jovem-jogador-de-volei-na-quadra_23-2149492349.jpg?ga=GA1.1.1603704743.1686338071&semt=sph" },
    { url: "https://img.freepik.com/fotos-premium/mulher-com-cabelo-afro-jogando-volei-de-praia_1048944-20326326.jpg?ga=GA1.1.1603704743.1686338071&semt=ais_user" },
    { url: "https://img.freepik.com/fotos-premium/estilo-de-vida-de-volei-de-praia-garota-atletica-em-acao-na-areia_148840-108748.jpg?ga=GA1.1.1603704743.1686338071&semt=ais_user" },
    { url: "https://img.freepik.com/fotos-gratis/duas-jogadoras-de-volei-cumprimentando-cada-uma-na-frente-da-rede_23-2148662702.jpg?ga=GA1.1.1603704743.1686338071&semt=ais_user" }
  ]

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
  const queryClient = useQueryClient();
  const { sizes } = THEME

  const loadTenantProfile = async () => {
    try {
      const { data } = await GetTenantProfileService(tenantId)
      console.log(data.data.id)
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
      await queryClient.setQueryData(['get-tenant-profile', tenantId], (oldData: ITenantProfileDTO) => {
        return { ...oldData, images: oldData.images.push(data.data) }
      })
      fireSuccesToast('Imagem adicionada com sucesso!')
    })
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
                    <View px={4} mt={2}>
                      <Text color="coolGray.500" fontSize="md" mb={2}> Bio </Text>
                      <Text>{tenantProfile.description}</Text>
                    </View>
                  )
                }
                <View mt={2} py={4} borderBottomWidth={0.5} borderBottomColor="coolGray.400">
                  <Center>
                    <ImageSVG />
                  </Center>
                </View>
                <View flex={1} justifyContent="space-between" display="flex" flexDirection="row" flexWrap="wrap">
                  {tenantProfile.images && tenantProfile.images.length > 0 && (
                    tenantProfile.images.map((image) => {
                      return (
                        <TouchableOpacity key={image.id}>
                          <Image
                            w={32}
                            h={32}
                            alt="image profile"
                            source={{
                              uri: image.url,
                            }}
                            defaultSource={{ uri: image.url }}
                            mt={1}
                          />
                        </TouchableOpacity>

                      )
                    })
                  )}
                  {
                    (!tenantProfile.images || tenantProfile.images.length < 9) && isTenantAdmin && (
                      <TouchableOpacity onPress={handleClickAddImage}>
                        <View w={32} h={32} borderWidth={0.8} borderRadius={7} borderStyle="dashed" borderColor="brand.500" alignItems="center" justifyContent="center" mt={1}>
                          <Icon as={<PlusCircle size={32} weight="light" />} color="brand.500" />
                        </View>
                      </TouchableOpacity>
                    )
                  }
                </View>
              </VStack >
            )
        }
      </ScrollView >
    </View >
  );
}