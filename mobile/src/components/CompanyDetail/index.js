import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Linking, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { graphql, fetchQuery } from 'react-relay';
import { ActivityIndicator } from 'react-native-paper';

import Modal from '../ModalDefault';

import environment from '../../services/createRelayEnvironment';
import alert from '../../services/alert';

import styles from './styles';

import companyLogo from '../../assets/images/store.png';

export default function CompanyDetail({ showModal, setShowModal }) {
    const store = useSelector(state => state.company);
    const [load, setLoad] = useState(false);
    const [provider, setProvider] = useState({});
    const [address, setAddress] = useState({});

    useEffect(() => {
        getInfo();
    }, [store.id])

    async function getInfo() {
        setLoad(true)
        try {
            const query = graphql`
            query CompanyDetailuserShowQuery($id: ID!) {
                userShow (id: $id)  {
                    name
                    doc
                    email
                    phone1
                    phone2
                    photoUrl
                    Address {
                        cep
                        street
                        number
                        complement
                        city
                        state
                    }
                }
            }`

            const variables = { id: store.id }
            const { userShow } = await fetchQuery(environment, query, variables)

            if (userShow) {
                setProvider(userShow);
                setAddress(userShow.Address);
            }

        } catch (error) {
            console.error(error);
            alert.errorInform(
                null,
                'Houve um erro ao carregar detalhes desta empresa. Por favor, tente novamente');
        }
        setLoad(false);

        setShowModal(true);
    }

    function ActivityIndicatorShow() {
        const resp = load ? <ActivityIndicator animating={load} /> : null;
        return resp;
    }

    function MountPhoneDiv() {
        const resp = [];

        [provider.phone1, provider.phone2].forEach(el => {
            resp.push(
                <View style={styles.contentPhone}>
                    <Text>{el}</Text>

                    <TouchableOpacity onPress={() =>
                        Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
                            if (supported) {
                                return Linking.openURL(
                                    `whatsapp://send?phone=55${el}` +
                                    `&text=Olá! ${provider.name}`
                                );
                            } else {
                                return Linking.openURL(
                                    `https://api.whatsapp.com/send?phone=55` +
                                    `${el}&text=Olá! ${provider.name}`
                                );
                            }
                        })
                    }
                        style={styles.phoneAction}>
                        <Icon name='whatsapp' size={30} color='#25d366' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() =>
                        Linking.openURL(`tel:${el}`)
                    }
                        style={styles.phoneAction}>
                        <Icon name='phone' size={30} color='#4E95C9' />
                    </TouchableOpacity>
                </View>
            )
        });
        return resp;
    }

    return (
        <Modal closeModal={setShowModal} showModal={showModal} >
            <ActivityIndicatorShow />

            <View style={styles.content}>
                <Text style={styles.text1}>{provider.name}</Text>

                {provider.photoUrl
                    ? <Image style={styles.logo} source={{ uri: provider.photoUrl }} />
                    : <Image style={styles.logo} source={companyLogo} />}

                <Text style={styles.text2}>
                    {address.cep}, {address.street}, {address.number}, {address.complement},
                        {address.district}, {address.city}-{address.state}
                </Text>

                <MountPhoneDiv />
            </View>
        </Modal>
    );
}
