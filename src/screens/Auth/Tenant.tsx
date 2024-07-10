import { Button } from "@components/Button";
import { PageHeader } from "@components/PageHeader";
import { Center, HStack, Heading, Image, Text, VStack, View } from "native-base";
import FacebookSVG from "@assets/facebook-outine.svg"
import InstagramSVG from "@assets/instagram-outline.svg"
import WhatsappSVG from "@assets/whatsapp-outline.svg"
import ImageSVG from "@assets/image-outline.svg"


export function Tenant() {
  return (
    <View flex={1}>
      <PageHeader title="Perfil" />
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
          <Button title="INSCREVA-SE" mt={6} w="1/2" h={12} />
          <HStack mt={6} space={2}>
            <FacebookSVG width={36} height={36} />
            <InstagramSVG width={36} height={36} />
            <WhatsappSVG width={36} height={36} />
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
      </VStack>
    </View>
  );
}