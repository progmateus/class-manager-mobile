import { Button } from "@components/Button";
import { PageHeader } from "@components/PageHeader";
import { Center, HStack, Heading, Image, ScrollView, Text, VStack, View } from "native-base";
import FacebookSVG from "@assets/facebook-outine.svg"
import InstagramSVG from "@assets/instagram-outline.svg"
import WhatsappSVG from "@assets/whatsapp-outline.svg"
import ImageSVG from "@assets/image-outline.svg"
import { TouchableOpacity } from "react-native";


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
  return (
    <View flex={1}>
      <PageHeader title="Perfil" />
      <ScrollView>
        <VStack>
          <Center mt={8}>
            <Image
              rounded="full"
              w={24}
              h={24}
              alt="image profile"
              source={{
                uri: 'https://img.freepik.com/vetores-gratis/silhueta-de-volei-desenhada-de-mao_23-2149399510.jpg?t=st=1720572316~exp=1720575916~hmac=26363405889cb81a340f09d38a956c628c43ede7d071865047cc5d86bbc2e6e8&w=826',
              }}
              defaultSource={{ uri: 'https://img.freepik.com/vetores-gratis/silhueta-de-volei-desenhada-de-mao_23-2149399510.jpg?t=st=1720572316~exp=1720575916~hmac=26363405889cb81a340f09d38a956c628c43ede7d071865047cc5d86bbc2e6e8&w=826' }}
            />

            <Heading mt={4} fontSize="xl"> Vôlei Na Ilha</Heading>
            <Text fontSize="sm"> @voleinaliha </Text>
            <Button title="INSCREVA-SE" mt={6} w="1/2" h={10} fontSize="xs" />
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
            <Text> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survsdsd</Text>
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
      </ScrollView>
    </View >
  );
}