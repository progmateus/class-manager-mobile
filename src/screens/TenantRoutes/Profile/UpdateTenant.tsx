import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Actionsheet, Box, Center, HStack, Heading, Icon, Text, VStack, View } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Check, FacebookLogo, InstagramLogo, Plus, TrashSimple, WhatsappLogo } from "phosphor-react-native"
import { ScrollContainer } from "@components/ScrollContainer";
import { useAuth } from "@hooks/useAuth";
import { useCallback, useState } from "react";
import { fireSuccesToast, fireWarningToast } from "@utils/HelperNotifications";
import { TextArea } from "@components/form/TextArea";
import { UpdateTenantSertvice, UploadtenantAvatarService } from "src/services/tenantsService";
import { Avatar } from "@components/Avatar/Avatar";
import { InputMask } from "@components/form/InputMask";
import { THEME } from "src/theme";
import { TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { ILinkDTO } from "@dtos/tenants/ILinkDTO";
import { ELinkType } from "src/enums/ELinkType";
import { ITenantProfileDTO } from "@dtos/tenants/ITenantProfileDTO";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"

const DocumentRegex = /([0-9]{2}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[\\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[-]?[0-9]{2})/
const phoneRegex = /(\(?\d{2}\)?) ?(9{1})? ?(\d{4})-? ?(\d{4})/

const updateTenantSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(80, "Max 80 caracteres").trim(),
  description: z.string().max(200, "Max 80 caracteres").trim().optional(),
  email: z.string({ required_error: "Campo obrigatório", }).email("E-mail inválido").trim(),
  document: z.string().regex(DocumentRegex, "Documento Inválido").trim().transform((val) => val?.replaceAll(/\W/g, '')),
  phone: z.string().regex(phoneRegex, "Número inválido").trim().transform((val) => val?.replaceAll(/\W/g, '')),
});

type UpdateTenantProps = z.infer<typeof updateTenantSchema>

export function UpdateTenant() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSocialOptionId, setSelectedSocialOptionId] = useState("")
  const [isSelectSocialOpen, setIsSelectSocialOpen] = useState(false)
  const [tenant, setTenant] = useState<ITenantProfileDTO>({} as ITenantProfileDTO)


  const { tenant: tenantcontext, refreshTenant, tenantUpdate } = useAuth();
  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const { colors, sizes } = THEME

  useFocusEffect(useCallback(() => {
    setTenant(tenantcontext)
  }, [tenantcontext]))

  const { control, handleSubmit, formState: { errors }, setError } = useForm<UpdateTenantProps>({
    defaultValues: {
      name: tenantcontext.name,
      email: tenantcontext.email,
      description: tenantcontext.description,
      phone: '2140028922',
      document: tenantcontext.document
    },
    resolver: zodResolver(updateTenantSchema)
  });

  const checkErrors = (errors: any[]) => {
    if (errors.find((e) => e.property == "Document.Number")) {
      setError("document", {
        message: "Documeno inválido"
      })
    }

    if (errors.find((e) => e.message == "Document already exists")) {
      setError("document", {
        message: "Este documento já está sendo utilizado"
      })
    }

    if (errors.find((e) => e.message == "E-mail already exists")) {
      setError("email", {
        message: "Este E-mail já esta sendo utilizado"
      })
    }
  }

  const handleAddLink = () => {
    setTenant(prevState => {
      return {
        ...prevState,
        links: [
          ...tenant.links,
          {
            id: String(Math.floor(Math.random() * 100)),
            type: ELinkType.WHATSAPP,
            url: ''
          }
        ]
      }
    });
  }

  const tranformSocialIcon = (number: number): Element => {
    const icons: any = {
      1: <WhatsappLogo size={sizes['8']} />,
      2: <InstagramLogo size={sizes['8']} />,
      3: <FacebookLogo size={sizes['8']} />
    }
    return icons[number];
  }

  const handleOpenSelectAction = (optionId: string) => {
    setIsSelectSocialOpen(true)
    setSelectedSocialOptionId(optionId)
  }

  const handleChooseSocialType = (optionType: number) => {
    const link = tenant.links.find(ts => ts.id === selectedSocialOptionId)
    if (link) {
      link.type = optionType
    }
    setIsSelectSocialOpen(false)
  }

  const handleRemoveLink = (optionId: string) => {
    setTenant(prevState => {
      return {
        ...prevState,
        links: [...tenant.links.filter(link => link.id !== optionId)]
      }
    });
  }

  const handleUpdate = ({ name, description, email, document }: UpdateTenantProps) => {
    if (!tenant.id || isLoading) return

    let isValid = true;

    if (tenant.links && tenant.links.length > 0) {
      tenant.links.map((ts) => {
        if (!ts.url || (ts.type == ELinkType.WHATSAPP && !ts.url.match(phoneRegex))) {
          isValid = false
          fireWarningToast('Informe uma rede social válida')
        }
      })
      if (!isValid) return

      tenant.links = [
        ...tenant.links.map((ts) => {
          return {
            type: ts.type,
            url: ts.type === ELinkType.WHATSAPP ? ts.url.replaceAll(/\W/g, '') : ts.url
          }
        }) as ILinkDTO[]
      ]
    }


    setIsLoading(true)
    UpdateTenantSertvice({ name, description, email, document, links: tenant.links }, tenant.id).then(() => {
      fireSuccesToast("Empresa atualizada!")
      refreshTenant()
      navigation.navigate('tenantProfile', { tenantIdParams: tenant.id })
    }).catch((err) => {
      console.log("errrrr: ", err)
      if (err.message && err.message === "ERR_VALIDATION") {
        checkErrors(err.errors)
      }
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleSelectAvatarPhoto = async () => {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true
    })

    if (photoSelected.canceled) return

    if (photoSelected.assets[0].uri) {
      const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
      handleUpdateTenantAvatar(photoSelected.assets[0])
    } else {
      return
    }
  }


  const handleUpdateTenantAvatar = async (image: ImagePicker.ImagePickerAsset) => {
    const fileExtension = image.uri.split('.').pop()
    const avatarFile = {
      name: `${tenant.name}.${fileExtension}`.toLowerCase(),
      uri: image.uri,
      type: `${image.type}/${fileExtension}`
    } as any

    const userAvatarUploadForm = new FormData();
    userAvatarUploadForm.append('image', avatarFile)

    UploadtenantAvatarService(tenant.id, userAvatarUploadForm).then(({ data }) => {
      tenantUpdate({
        ...tenantcontext,
        avatar: data.data.avatar
      })
      fireSuccesToast('Foto alterada com sucesso!')
      navigation.navigate('tenantProfile', { tenantIdParams: tenant.id })
    }).catch((err) => {
      console.log('err: ', err)
    })
  }

  return (
    <View flex={1} >
      <PageHeader title="Alterar Empresa" rightIcon={Check} rightAction={handleSubmit(handleUpdate)} />
      <ScrollContainer>
        <VStack pb={20}>
          <Center>
            <TouchableOpacity onPress={handleSelectAvatarPhoto}>
              <Center>
                <Avatar
                  rounded="full"
                  type="tenant"
                  w={24}
                  h={24}
                  alt="Foto de perfil"
                  mr={4}
                  src={tenant.avatar}
                />
                < Text fontSize="md" mt={4} textAlign="center" fontWeight="bold" color="brand.600" > Alterar foto de perfil </Text>
              </Center>
            </TouchableOpacity>
          </Center>

          <VStack space={6} mt={12} >
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="Nome" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextArea label="Bio" value={value} onChangeText={onChange} h={24} px={2} fontSize="sm" variant="outline" color="coolGray.800" errorMessage={errors.description?.message} />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="E-mail" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.email?.message} />
              )}
            />

            <Controller
              name="document"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="CPF / CNPJ" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.document?.message} />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputMask label="Telefone" type="cel-phone" onChangeText={onChange} value={value} errorMessage={errors.phone?.message} />
              )}
            />


            <View>
              <HStack justifyContent="space-between" my={4}>
                <Text fontSize="lg" fontWeight="bold"> Redes Sociais</Text>
                <TouchableOpacity onPress={handleAddLink}>
                  <Plus color={colors.brand['500']} size={22} />
                </TouchableOpacity>
              </HStack>
              <VStack space={4} >
                {
                  tenant.links && tenant.links.length > 0 && (
                    tenant.links.map((link) => {
                      return (
                        <HStack key={link.id} alignItems="center" space={2} >
                          <TouchableOpacity onPress={() => handleOpenSelectAction(link.id)}>
                            <Icon as={tranformSocialIcon(link.type)} />
                          </TouchableOpacity>
                          <Input
                            defaultValue={link.url}
                            variant="outline"
                            onChangeText={text => link.url = text}
                            placeholderTextColor={colors.coolGray['300']}
                            placeholder={link.type === ELinkType.INSTAGRAM ? 'www.instagram.com/username' : link.type === ELinkType.FACEBOOK ? 'www.facebook.com/username' : '11999999999'}
                          />
                          <TouchableOpacity onPress={() => handleRemoveLink(link.id)}>
                            <Icon as={TrashSimple} />
                          </TouchableOpacity>
                        </HStack>
                      )
                    })
                  )
                }
              </VStack>
            </View>
          </VStack>
        </VStack>
        <Actionsheet isOpen={isSelectSocialOpen} onClose={() => setIsSelectSocialOpen(false)}>
          <Actionsheet.Content>
            <VStack minH="64" w="100%">
              <Box w="100%" py={4} px={4} justifyContent="center" alignSelf="center">
                <Heading fontSize="16" color="coolGray.700" textAlign="center">
                  Redes Sociais
                </Heading>
              </Box>
              <View flex={1}>
                <Actionsheet.Item onPress={() => handleChooseSocialType(1)}>
                  <HStack alignItems="center" justifyContent="center" space={2}>
                    <WhatsappLogo />
                    <Text> Whatsapp </Text>
                  </HStack>
                </Actionsheet.Item>

                <Actionsheet.Item onPress={() => handleChooseSocialType(2)}>
                  <HStack alignItems="center" justifyContent="center" space={2}>
                    <InstagramLogo />
                    <Text> Instagram </Text>
                  </HStack>
                </Actionsheet.Item>

                <Actionsheet.Item onPress={() => handleChooseSocialType(3)}>
                  <HStack alignItems="center" justifyContent="center" space={2}>
                    <FacebookLogo />
                    <Text> Facebook </Text>
                  </HStack>
                </Actionsheet.Item>

              </View>
            </VStack>
          </Actionsheet.Content>
        </Actionsheet>

      </ScrollContainer>
    </View >
  )
}