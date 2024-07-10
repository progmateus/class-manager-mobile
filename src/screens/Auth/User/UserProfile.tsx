import { PageHeader } from "@components/PageHeader";
import { Center, HStack, Heading, Image, ScrollView, Text, VStack, View } from "native-base";
import SettingsSVG from "@assets/settings-outline.svg";
import CardSVG from "@assets/card-outline.svg";
import MoneySVG from "@assets/money-outline.svg";
import ShieldSVG from "@assets/shield-outline.svg";
import SubscriptionsSVG from "@assets/subscriptions-outline.svg";
import HistorySVG from "@assets/history-outline.svg";
import LogoutSVG from "@assets/logout-outline.svg";
import { MenuOption } from "@components/MenuOption/Index";




export function Profile() {

  const subscriptions = [
    {
      tenant: {
        name: "Vôlei Na Ilha",
        avatar: "https://img.freepik.com/vetores-premium/modelo-de-vetor-de-esporte-de-volei-ilustracao-grafica-de-voleibol-no-estilo-de-remendo-do-emblema-distintivo_687309-317.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    },
    {
      tenant: {
        name: "Bica Beach",
        avatar: "https://img.freepik.com/vetores-gratis/silhueta-de-volei-desenhada-de-mao_23-2149397214.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    },
    {
      tenant: {
        name: "Beach tennis",
        avatar: "https://img.freepik.com/fotos-premium/jogadores-de-voleibol-profissional-feminino-em-acao-no-estadio-3d_654080-1098.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    },
    {
      tenant: {
        name: "Vôlei Insulanos",
        avatar: "https://img.freepik.com/fotos-gratis/jogadores-de-basquete-na-grande-arena-profissional-durante-o-jogo_654080-388.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    },
    {
      tenant: {
        name: "Vôlei Insulanos",
        avatar: "https://img.freepik.com/fotos-gratis/jogadores-de-basquete-na-grande-arena-profissional-durante-o-jogo_654080-388.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    },
    {
      tenant: {
        name: "Vôlei Insulanos",
        avatar: "https://img.freepik.com/fotos-gratis/jogadores-de-basquete-na-grande-arena-profissional-durante-o-jogo_654080-388.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    },
    {
      tenant: {
        name: "Vôlei Insulanos",
        avatar: "https://img.freepik.com/fotos-gratis/jogadores-de-basquete-na-grande-arena-profissional-durante-o-jogo_654080-388.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    }
  ]

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
        <HStack space={2} mt={16} px={4}>
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

        <Text px={4} mt={8} mb={4}> Minhas inscrições</Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack space={4} px={4} >
            {
              subscriptions && subscriptions.length > 0 && (
                subscriptions.map((subscription) => {
                  return (
                    <VStack justifyContent="center" alignItems="center" space={2}>
                      <Image
                        rounded="full"
                        w={12}
                        h={12}
                        alt="user image"
                        source={{
                          uri: subscription.tenant.avatar,
                        }}
                        defaultSource={{ uri: subscription.tenant.avatar }}
                      />
                      <Text fontSize="xs"> {subscription.tenant.name}</Text>
                    </VStack>
                  )
                })
              )
            }
          </HStack>
        </ScrollView>
        <View mt={8}>
          <MenuOption icon={<SettingsSVG width={22} height={22} />} title="Configurar Conta" />
          <MenuOption icon={<CardSVG width={22} height={22} />} title="Dados Pessoais" />
          <MenuOption icon={<ShieldSVG width={22} height={22} />} title="Alterar Senha" />
          <MenuOption icon={<MoneySVG width={22} height={22} />} title="Cobranças" />
          <MenuOption icon={<HistorySVG width={22} height={22} />} title="Histórico de Aulas" />
          <MenuOption icon={<SubscriptionsSVG width={22} height={22} />} title="Gerenciar Inscrições" />
          <MenuOption icon={<LogoutSVG width={22} height={22} />} title="Sair" />
        </View>
      </ScrollView>
    </View>

  );
}