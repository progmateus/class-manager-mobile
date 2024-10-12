import { Button } from "@components/Button";
import { PageHeader } from "@components/PageHeader";
import { Center, HStack, Heading, Icon, Image, Link, ScrollView, Text, VStack, View } from "native-base";
import ImageSVG from "@assets/image-outline.svg"
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo } from "react";
import { GetTenantProfileService } from "src/services/tenantsService";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useAuth } from "@hooks/useAuth";
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO";
import { Avatar } from "@components/Avatar/Avatar";
import { TenantProfileSkeleton } from "@components/skeletons/screens/TenantProfile";
import { useQuery } from "@tanstack/react-query";
import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { FacebookLogo, InstagramLogo, WhatsappLogo } from "phosphor-react-native";
import { THEME } from "src/theme";
import { ITenantSocial } from "@dtos/tenants/ITenantSocial";
import { ESocialType } from "src/enums/ESocialType";


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

  const { tenantIdParams } = route.params as RouteParamsProps;
  const { tenant } = useAuth();
  const tenantId = tenant?.id ?? tenantIdParams;

  const { user } = useAuth()
  const { sizes } = THEME

  const loadTenantProfile = async () => {
    try {
      const { data } = await GetTenantProfileService(tenantId)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: tenantProfile, isLoading } = useQuery<ITenantDTO>({
    queryKey: ['get-tenant-profile', tenantId, user.id],
    queryFn: loadTenantProfile
  })

  const handleSubscribe = () => {
    navigation.navigate('createSubscription', {
      tenantIdParams
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


  const getLinkHref = (ts: ITenantSocial): string => {
    if (ts.type == ESocialType.WHATSAPP) {
      return `https://wa.me/${ts.url}`
    }
    return ts.url
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
                    subscriptionExists ?
                      (
                        <Button title="INSCRITO" variant="outline" mt={6} w="1/2" h={10} fontSize="xs" onPress={handleNavigateSubscription} />

                      ) :
                      (
                        <Button title="INSCREVA-SE" mt={6} w="1/2" h={10} fontSize="xs" onPress={handleSubscribe} />
                      )
                  }
                  <HStack mt={6} space={2}>
                    {
                      tenantProfile.tenantsSocials && tenantProfile.tenantsSocials.length > 0 && (
                        tenantProfile.tenantsSocials.map((ts) => {
                          return (
                            <TouchableOpacity>
                              <Link href={getLinkHref(ts)}>
                                <Icon as={tranformSocialIcon(ts.type)} color="coolGray.800" />
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
              </VStack >
            )
        }
      </ScrollView >
    </View >
  );
}