import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import { getCustomer } from '../repository/customers-repositoty';
import { getUser } from '../repository/user-repository';
import EventsScreen from './EventsScreen';
import PaymentScreen from './PaymentScreen';
import UserScreen from './UserScreen';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const userData = await getUser();
    const userCustomer = await getCustomer();
    setUser(userData);
    setCustomer(userCustomer);
  }


  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'events', title: 'Consumo' },
    { key: 'payment', title: 'Pagamentos' },
    { key: 'user', title: 'Sobre' },

  ]);

  const renderScene = SceneMap({
    user: () => <UserScreen navigation={navigation} user={user} customer={customer} />,
    payment: PaymentScreen,
    events: EventsScreen,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={{ backgroundColor: '#333' }}
    />
  );
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      tabBarPosition='bottom'
    />
  );
}

