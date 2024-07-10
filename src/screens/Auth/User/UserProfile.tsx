import { PageHeader } from "@components/PageHeader";
import { Center, HStack, Heading, Image, ScrollView, Text, VStack, View } from "native-base";
import SettingsSVG from "@assets/settings-outline.svg";
import CardSVG from "@assets/card-outline.svg";
import MoneySVG from "@assets/money-outline.svg";
import ShieldSVG from "@assets/shield-outline.svg";
import SubscriptionsSVG from "@assets/subscriptions-outline.svg";
import HistorySVG from "@assets/history-outline.svg";
import LogoutSVG from "@assets/logout-outline.svg";




export function Profile() {

  const user = {
    name: "John",
    lastname: "Doe",
    username: "johndoe",
    avatar: "https://img.freepik.com/fotos-gratis/cintura-para-cima-retrato-de-bonito-homem-serio-com-barba-por-fazer-mantem-as-maos-juntas-vestido-com-camisa-azul-escura-tem-conversa-com-o-interlocutor-fica-contra-a-parede-branca-freelancer-homem-autoconfiante_273609-16320.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
  }
  return (
    <View>
      <PageHeader title="Perfil" />
      <ScrollView>
        <HStack space={2} mt={16} mb={8} px={4}>
          <Image
            rounded="full"
            w={16}
            h={16}
            alt="user image"
            source={{
              uri: user.avatar,
            }}
            defaultSource={{ uri: user.avatar }}
          />
          <VStack alignItems="left" justifyContent="center">
            <Heading fontFamily="heading"> {user.name} {user.lastname}</Heading>
            <Text fontFamily="body"> @{user.username}</Text>
          </VStack>
        </HStack>
        <HStack space={1} alignItems="center" py={4} borderTopColor="coolGray.500" borderTopWidth={0.5} px={4}>
          <SettingsSVG width={22} height={22} />
          <Text> Configurar Conta</Text>
        </HStack>
        <HStack space={1} alignItems="center" py={4} borderTopColor="coolGray.500" borderTopWidth={0.5} px={4}>
          <CardSVG width={22} height={22} />
          <Text> Dados Pessoais</Text>
        </HStack>
        <HStack space={1} alignItems="center" py={4} borderTopColor="coolGray.500" borderTopWidth={0.5} px={4}>
          <ShieldSVG width={22} height={22} />
          <Text> Alterar Senha</Text>
        </HStack>
        <HStack space={1} alignItems="center" py={4} borderTopColor="coolGray.500" borderTopWidth={0.5} px={4}>
          <MoneySVG width={22} height={22} />
          <Text> Cobranças</Text>
        </HStack>
        <HStack space={1} alignItems="center" py={4} borderTopColor="coolGray.500" borderTopWidth={0.5} px={4}>
          <HistorySVG width={22} height={22} />
          <Text> Histórico de Aulas</Text>
        </HStack>
        <HStack space={1} alignItems="center" py={4} borderTopColor="coolGray.500" borderTopWidth={0.5} px={4}>
          <SubscriptionsSVG width={22} height={22} />
          <Text> Gerenciar Inscrições </Text>
        </HStack>
        <HStack space={1} alignItems="center" py={4} borderTopColor="coolGray.500" borderTopWidth={0.5} px={4}>
          <LogoutSVG width={22} height={22} />
          <Text> Sair</Text>
        </HStack>
      </ScrollView>
    </View>

  );
}