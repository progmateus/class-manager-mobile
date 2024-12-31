import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Center, HStack, Image, Text, VStack, View } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Check } from "phosphor-react-native"
import { ScrollContainer } from "@components/ScrollContainer";
import { useAuth } from "@hooks/useAuth";
import { UpdateUserService, UploadUserAvatarService } from "src/services/usersService";
import { useCallback, useState } from "react";
import { fireErrorToast, fireSuccesToast, fireWarningToast } from "@utils/HelperNotifications";
import { Avatar } from "@components/Avatar/Avatar";
import { InputMask } from "@components/form/InputMask";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { AxiosError } from "axios";

const CPFRegex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
const CNPJRegex = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/
const phoneRegex = /(\(?\d{2}\)?) ?(9{1})? ?(\d{4})-? ?(\d{4})/

const updateUserSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório", }).min(3, "Min 3 caracteres").max(150, "Max 150 caracteres").trim(),
  email: z.string({ required_error: "Campo obrigatório", }).email("E-mail inválido").trim(),
  document: z.string().regex(CPFRegex, "CPF Inválido").trim().optional().transform((val) => val?.replaceAll(/\W/g, '')),
  phone: z.string().regex(phoneRegex, "Número inválido").trim().optional().transform((val) => val?.replaceAll(/\W/g, '')),
});

type updateUserProps = z.infer<typeof updateUserSchema>

export function UpdateUser() {
  const [isLoading, setIsLoading] = useState(false)
  const { user, userUpdate } = useAuth();
  const navigation = useNavigation<UserNavigatorRoutesProps>()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<updateUserProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      document: user.document
    },
    resolver: zodResolver(updateUserSchema)
  });

  const handleUpdate = ({ name, email, document, phone }: updateUserProps) => {
    if (!user.id || isLoading) return
    setIsLoading(true)
    UpdateUserService({ name, email, document, phone }).then(() => {
      fireSuccesToast('Informações atualizadas com sucesso!')
      userUpdate({
        ...user,
        name, email, document, phone
      })
      reset({
        name, email, document, phone
      })
      navigation.navigate('profile')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  useFocusEffect(useCallback(() => {
    reset()
  }, []))

  const handleSelectUserPhoto = async () => {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true
    })

    if (photoSelected.canceled) return

    if (photoSelected.assets[0].uri) {
      const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
      handleUpdateUserAvatar(photoSelected.assets[0])
    } else {
      return
    }
  }


  const handleUpdateUserAvatar = async (image: ImagePicker.ImagePickerAsset) => {
    const fileExtension = image.uri.split('.').pop()
    const avatarFile = {
      name: `${user.name}.${fileExtension}`.toLowerCase(),
      uri: image.uri,
      type: `${image.type}/${fileExtension}`
    } as any

    const userAvatarUploadForm = new FormData();
    userAvatarUploadForm.append('image', avatarFile)

    UploadUserAvatarService(userAvatarUploadForm).then(({ data }) => {
      userUpdate({
        ...user,
        avatar: data.data.avatar
      })
      fireSuccesToast('Foto alterada com sucesso!')
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Dados Pessoais" rightIcon={Check} rightAction={handleSubmit(handleUpdate)} />
      <ScrollContainer>
        <VStack pb={20}>
          <Center>
            <TouchableOpacity onPress={handleSelectUserPhoto}>
              <Center>
                <Avatar
                  rounded="full"
                  w={24}
                  h={24}
                  alt="Foto de perfil"
                  src={user.avatar}
                />
                <Text fontSize="md" mt={4} textAlign="center" fontWeight="bold" color="brand.600">Alterar foto de perfil</Text>
              </Center>

            </TouchableOpacity>
          </Center>
          <VStack space={6} mt={12}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="Nome" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
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
                <InputMask label="CPF" type="cpf" onChangeText={onChange} value={value} errorMessage={errors.document?.message} />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputMask label="Telefone" type="cel-phone" onChangeText={onChange} value={value} errorMessage={errors.phone?.message} />
              )}
            />
          </VStack>
        </VStack>
      </ScrollContainer>
    </View >
  )
}