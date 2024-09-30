import { PageHeader } from "@components/PageHeader";
import { Actionsheet, Box, Center, HStack, Heading, Icon, Image, ScrollView, Text, VStack, View } from "native-base";
import SettingsSVG from "@assets/settings-outline.svg";
import CardSVG from "@assets/card-outline.svg";
import MoneySVG from "@assets/money-outline.svg";
import ShieldSVG from "@assets/shield-outline.svg";
import SubscriptionsSVG from "@assets/subscriptions-outline.svg";
import HistorySVG from "@assets/history-outline.svg";
import LogoutSVG from "@assets/logout-outline.svg";
import { MenuOption } from "@components/MenuOption/Index";
import { SubscriptionOption } from "@components/SubscriptionOption";
import { useNavigation } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { ArrowsLeftRight, Plus } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { IUsersRolesDTO } from "@dtos/roles/IUsersRolesDTO";
import { Avatar } from "@components/Avatar/Avatar";
import { ScrollContainer } from "@components/ScrollContainer";


export function Profile() {
  const [isOpen, setIsOpen] = useState(false)
  /* const [tenantsOwners, setTenantsOwners] = useState<IUsersRolesDTO[]>([]) */
  const navigation = useNavigation<UserNavigatorRoutesProps>();
  const { user, signOut } = useAuth()
  const { authenticateTenant } = useAuth()


  function getUserTenantOwners(): IUsersRolesDTO[] {
    if (user.usersRoles && user.usersRoles.length > 0) {
      return user.usersRoles.filter((ur) => ur.role.name === "admin")
    }
    return []
  }


  const subscriptions = [
    {
      id: '1',
      tenant: {
        name: "Vôlei Na Ilha",
        avatar: "https://img.freepik.com/vetores-premium/modelo-de-vetor-de-esporte-de-volei-ilustracao-grafica-de-voleibol-no-estilo-de-remendo-do-emblema-distintivo_687309-317.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    },
    {
      id: '2',
      tenant: {
        name: "Bica Beach",
        avatar: "https://img.freepik.com/vetores-gratis/silhueta-de-volei-desenhada-de-mao_23-2149397214.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    },
    {
      id: '3',
      tenant: {
        name: "Beach tennis",
        avatar: "https://img.freepik.com/fotos-premium/jogadores-de-voleibol-profissional-feminino-em-acao-no-estadio-3d_654080-1098.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    },
    {
      id: '4',
      tenant: {
        name: "Vôlei Insulanos",
        avatar: "https://img.freepik.com/fotos-gratis/jogadores-de-basquete-na-grande-arena-profissional-durante-o-jogo_654080-388.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    },
    {
      id: '5',
      tenant: {
        name: "Vôlei Insulanos",
        avatar: "https://img.freepik.com/fotos-gratis/jogadores-de-basquete-na-grande-arena-profissional-durante-o-jogo_654080-388.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    },
    {
      id: '6',
      tenant: {
        name: "Vôlei Insulanos",
        avatar: "https://img.freepik.com/fotos-gratis/jogadores-de-basquete-na-grande-arena-profissional-durante-o-jogo_654080-388.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    },
    {
      id: '7',
      tenant: {
        name: "Vôlei Insulanos",
        avatar: "https://img.freepik.com/fotos-gratis/jogadores-de-basquete-na-grande-arena-profissional-durante-o-jogo_654080-388.jpg?ga=GA1.1.1603704743.1686338071&semt=sph"
      },
    }
  ]

  return (
    <View flex={1}>
      <PageHeader title="Informações" />
      <ScrollView>
        <HStack space={2} mt={8} px={4}>
          <Avatar
            rounded="full"
            w={16}
            h={16}
            alt="user image"
            src={user.avatar}
            username={user.username}
          />
          <VStack alignItems="left" justifyContent="center">
            <Heading fontFamily="heading">{user.firstName} {user.lastName}</Heading>
            <Text fontFamily="body"> @{user.username}</Text>
          </VStack>
        </HStack>

        <Text px={4} mt={8} mb={4}> Minhas inscrições</Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack space={4} px={4} >
            {
              user.subscriptions && user.subscriptions.length > 0 && (
                user.subscriptions.map((subscription) => {
                  return (
                    <SubscriptionOption key={subscription.id} subscription={subscription} />
                  )
                })
              )
            }
          </HStack>
        </ScrollView>
        <View mt={8} pb="8">
          <MenuOption icon={<SettingsSVG width={22} height={22} />} title="Configurar Conta" onPress={() => navigation.navigate('updateUser')} />
          <MenuOption icon={<CardSVG width={22} height={22} />} title="Dados Pessoais" onPress={() => navigation.navigate('updateUser')} />
          <MenuOption icon={<ShieldSVG width={22} height={22} />} title="Alterar Senha" onPress={() => navigation.navigate('updatePassword')} />
          <MenuOption icon={<MoneySVG width={22} height={22} />} title="Cobranças" onPress={() => navigation.navigate('updateUser')} />
          <MenuOption icon={<HistorySVG width={22} height={22} />} title="Histórico de Aulas" onPress={() => navigation.navigate('bookingsHistory', {})} />
          <MenuOption icon={<SubscriptionsSVG width={22} height={22} />} title="Gerenciar Inscrições" onPress={() => navigation.navigate('updateUser')} />
          <MenuOption icon={<ArrowsLeftRight />} title="Alterar conta" onPress={() => setIsOpen(true)} />
          <MenuOption icon={<LogoutSVG width={22} height={22} />} title="Sair" onPress={signOut} />
        </View>

        <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text fontSize="16" color="gray.300">
                Empresas
              </Text>
            </Box>
            {
              user.usersRoles && user.usersRoles.length > 0 && (
                user.usersRoles.filter((ur) => ur.role.name === "admin").map((ur) => {
                  return (
                    <Actionsheet.Item key={ur.id} onPress={() => authenticateTenant(ur.tenant.id)}>
                      <HStack alignItems="center" justifyContent="center" space={4}>
                        <Avatar
                          size="md"
                          bg="green.500"
                          src={ur.tenant.avatar}
                        />
                        <Text fontSize="16" color="gray.700">
                          {ur.tenant?.name}
                        </Text>
                      </HStack>
                    </Actionsheet.Item>
                  )
                })
              )
            }
            <Actionsheet.Item onPress={() => navigation.navigate('createTenant')}>
              <HStack alignItems="center" justifyContent="center" space={4}>
                <View p={3.5} bgColor="gray.100" rounded="full">
                  <Icon as={Plus} color="gray.500" rounded="full" />
                </View>
                <Text fontSize="16" color="gray.700">
                  Adicionar
                </Text>
              </HStack>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </ScrollView>
    </View>

  );
}