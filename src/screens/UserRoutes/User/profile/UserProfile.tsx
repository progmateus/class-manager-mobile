import { PageHeader } from "@components/PageHeader";
import { Actionsheet, Box, FlatList, HStack, Heading, Icon, ScrollView, Text, VStack, View } from "native-base";
import SettingsSVG from "@assets/settings-outline.svg";
import CardSVG from "@assets/card-outline.svg";
import MoneySVG from "@assets/money-outline.svg";
import ShieldSVG from "@assets/shield-outline.svg";
import SubscriptionsSVG from "@assets/subscriptions-outline.svg";
import HistorySVG from "@assets/history-outline.svg";
import LogoutSVG from "@assets/logout-outline.svg";
import { MenuOption } from "@components/Items/MenuOption/Index";
import { SubscriptionOption } from "@components/Items/SubscriptionOption";
import { useNavigation } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { ArrowsLeftRight, ClockClockwise, IdentificationCard, Lock, MapPin, Plus, SignOut } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { IUsersRolesDTO } from "@dtos/roles/IUsersRolesDTO";
import { Avatar } from "@components/Avatar/Avatar";


export function Profile() {
  const [isOpen, setIsOpen] = useState(false)
  /* const [tenantsOwners, setTenantsOwners] = useState<IUsersRolesDTO[]>([]) */
  const navigation = useNavigation<UserNavigatorRoutesProps>();
  const { user, signOut } = useAuth()
  const { authenticateTenant } = useAuth()
  const hasSubscriptions = user.subscriptions && user.subscriptions.length > 0;


  function getUserTenantOwners(): IUsersRolesDTO[] {
    if (user.usersRoles && user.usersRoles.length > 0) {
      return user.usersRoles.filter((ur) => ur.role.name === "admin")
    }
    return []
  }

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
          />
          <VStack alignItems="left" justifyContent="center">
            <Heading fontFamily="heading">{user.name}</Heading>
            <Text fontFamily="body"> @{user.username}</Text>
          </VStack>
        </HStack>

        {
          user.subscriptions && user.subscriptions.length > 0 && (
            <>
              <Text px={4} mt={8} mb={4}> Minhas inscrições</Text>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <HStack space={4} px={4} >
                  {
                    user.subscriptions.map((subscription) => {
                      return (
                        <SubscriptionOption key={subscription.id} subscription={subscription} />
                      )
                    })
                  }

                </HStack>
              </ScrollView>
            </>
          )
        }

        <View pb="8" mt={!hasSubscriptions ? '16' : 8}>
          <MenuOption icon={<IdentificationCard size={24} />} title="Dados Pessoais" onPress={() => navigation.navigate('updateUser')} />
          <MenuOption icon={<Lock size={24} />} title="Alterar Senha" onPress={() => navigation.navigate('updatePassword')} />
          <MenuOption icon={<MapPin size={24} />} title="Alterar Endereço" onPress={() => navigation.navigate('updateUserAddress')} />
          <MenuOption icon={<ClockClockwise size={24} />} title="Histórico de Aulas" onPress={() => navigation.navigate('bookingsHistory', {})} />
          {/* <MenuOption icon={<SubscriptionsSVG width={22} />} title="Gerenciar Inscrições" onPress={() => navigation.navigate('updateUser')} /> */}
          <MenuOption icon={<ArrowsLeftRight size={24} />} title="Empresas" onPress={() => setIsOpen(true)} />
          <MenuOption icon={<SignOut size={22} />} title="Sair" onPress={signOut} />
        </View>

        <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text fontSize="16" color="gray.300">
                Empresas
              </Text>
            </Box>
            <FlatList
              w="100%"
              data={user.usersRoles.filter((ur) => ur.role.name === "admin")}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Actionsheet.Item key={item.id} onPress={() => authenticateTenant(item.tenant.id)}>
                  <HStack alignItems="center" justifyContent="center" space={4}>
                    <Avatar
                      size="10"
                      src={item.tenant?.avatar}
                    />
                    <Text fontSize="16" color="gray.700">
                      {item.tenant?.name}
                    </Text>
                  </HStack>
                </Actionsheet.Item>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
            <Actionsheet.Item onPress={() => navigation.navigate('createTenant')}>
              <HStack alignItems="center" justifyContent="center" space={4}>
                <View p={2.5} bgColor="gray.100" rounded="full">
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
    </View >

  );
}