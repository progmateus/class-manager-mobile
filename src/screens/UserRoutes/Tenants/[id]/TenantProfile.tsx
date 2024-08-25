import { Button } from "@components/Button";
import { PageHeader } from "@components/PageHeader";
import { Center, HStack, Heading, Image, ScrollView, Text, VStack, View } from "native-base";
import FacebookSVG from "@assets/facebook-outine.svg"
import InstagramSVG from "@assets/instagram-outline.svg"
import WhatsappSVG from "@assets/whatsapp-outline.svg"
import ImageSVG from "@assets/image-outline.svg"
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { GetTenantProfileService } from "src/services/tenantsService";
import { Loading } from "@components/Loading";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useAuth } from "@hooks/useAuth";
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { ISubscriptionDTO } from "@dtos/ISubscriptionDTO";


type RouteParamsProps = {
  tenantId: string;
}

interface ITenant {
  name: string;
  username: string;
  description: string;
  avatar: string;
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

  const { tenantId } = route.params as RouteParamsProps;
  const [tenant, setTenant] = useState<ITenant>({} as ITenant)
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<UserNavigatorRoutesProps>();

  const { user } = useAuth()

  const handleSubscribe = () => {
    navigation.navigate('createSubscription', {
      tenantId
    })
  }

  useEffect(() => {
    setIsLoading(true)
    GetTenantProfileService(tenantId).then(({ data }) => {
      setTenant(data.data)
    }).catch((err) => {
      console.log('err: ', err.response)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [tenantId])

  return (
    <View flex={1}>
      <PageHeader title="Perfil" />
      <ScrollView>
        {
          isLoading
            ?
            (
              <Loading />
            )
            :
            (
              <VStack>
                <Center mt={8}>
                  <Image
                    rounded="full"
                    w={24}
                    h={24}
                    alt="image profile"
                    source={{
                      uri: tenant.avatar,
                    }}
                    defaultSource={{ uri: tenant.avatar }}
                  />

                  <Heading mt={4} fontSize="xl">{tenant.name}</Heading>
                  <Text fontSize="sm">@{tenant.username}</Text>
                  {
                    user.subscriptions && user.subscriptions.length > 0 && user.subscriptions.find((s: ISubscriptionDTO) => s.tenantId === tenantId && s.status === ESubscriptionStatus.ACTIVE) ?
                      (
                        <Button title="CANCELAR INSCRIÇÃO" variant="outline" mt={6} w="1/2" h={10} fontSize="xs" onPress={handleSubscribe} />

                      ) :
                      (
                        <Button title="INSCREVA-SE" mt={6} w="1/2" h={10} fontSize="xs" onPress={handleSubscribe} />

                      )
                  }
                  <HStack mt={6} space={2}>
                    <TouchableOpacity>
                      <FacebookSVG width={36} height={36} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <InstagramSVG width={36} height={36} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <WhatsappSVG width={36} height={36} />
                    </TouchableOpacity>
                  </HStack>
                </Center>
                <View px={4}>
                  <Text color="coolGray.500" fontSize="md" mb={2}> Bio </Text>
                  <Text>{tenant.description}</Text>
                </View>
                <View mt={2} py={4} borderBottomWidth={0.5} borderBottomColor="coolGray.400">
                  <Center>
                    <ImageSVG />
                  </Center>
                </View>
                <View flex={1} justifyContent="space-between" display="flex" flexDirection="row" flexWrap="wrap">
                  {images && images.length > 0 && (
                    images.map((image) => {
                      return (
                        <TouchableOpacity key={image.url}>
                          <Image
                            w={32}
                            h={32}
                            alt="image profile"
                            source={{
                              uri: image.url,
                            }}
                            defaultSource={{ uri: image.url }}
                          />
                        </TouchableOpacity>

                      )
                    })
                  )}
                </View>
              </VStack>
            )
        }
      </ScrollView>
    </View >
  );
}