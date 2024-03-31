import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const OnboardingScreen = ({ navigation }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const handleSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    const handleLogInPress = () => {
        navigation.navigate('SignIn');
    };

    const landingPages = [
        {
            image: require('./assets/LandingImages/MEDSING.png'),
            text: 'Bienvenue sur Medsing !',
        },
        {
            image: require('./images/page2.jpg'),
            text: 'Signaler des médicaments',
        },
        {
            image: require('./images/page3.jpg'),
            text: 'Observer votre historique',
        },
        {
            image: require('./images/page4.jpg'),
            text: 'Scanner vos médicaments',
        },
    ];

    const handlePageChange = (index) => {
        setCurrentPage(index);
    };

    return (
        <Container>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <Content>
                <Pages>
                    {landingPages.map((page, index) => (
                        <Page key={index}>
                            <PageImage source={page.image} />
                            <PageText>{page.text}</PageText>
                        </Page>
                    ))}
                </Pages>
                <IndicatorContainer>
                    {landingPages.map((_, index) => (
                        <PageIndicator
                            key={index}
                            active={index === currentPage}
                        />
                    ))}
                </IndicatorContainer>
                <Button onPress={handleSignUpPress} blue>
                    <ButtonText>Inscription</ButtonText>
                </Button>
                <Button onPress={handleLogInPress} red>
                    <ButtonText>Connexion</ButtonText>
                </Button>
            </Content>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
`;

const Content = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-horizontal: 20px;
`;

const Pages = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

const Page = styled.View`
    align-items: center;
`;

const PageImage = styled(Image)`
    width: 300px;
    height: 300px;
    resize-mode: contain;
    margin-bottom: 20px;
`;

const PageText = styled.Text`
    color: #000;
    text-align: center;
    font-size: 18px;
    margin-bottom: 20px;
`;

const IndicatorContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

const PageIndicator = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${(props) => (props.active ? '#00f' : '#000')};
    margin-horizontal: 5px;
`;

const Button = styled.TouchableOpacity`
    background-color: ${(props) => (props.blue ? '#3498db' : props.red ? '#e74c3c' : '#FF6347')};
    padding-vertical: 15px;
    padding-horizontal: 40px;
    border-radius: 25px;
    margin-vertical: 10px;
`;

const ButtonText = styled.Text`
    color: #FFF;
    font-size: 18px;
    text-align: center;
`;

export default OnboardingScreen;
