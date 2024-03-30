import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const TermsScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Termes et Conditions de MEDSING</Text>

            <Text style={styles.text}>Dernière mise à jour : [insérer la date]</Text>

            <Text style={styles.sectionTitle}>1. Collecte d'Informations Personnelles</Text>
            <Text style={styles.text}>
                Pour fournir nos services, nous collectons les informations suivantes : Nom complet, Numéro de téléphone, Date de naissance, Adresse email, Photo de profil (facultative), Nom du médicament.
            </Text>

            <Text style={styles.sectionTitle}>2. Utilisation des Informations</Text>
            <Text style={styles.text}>
                Les informations collectées sont utilisées exclusivement pour : Vous identifier en tant qu'utilisateur de l'application, Communiquer avec vous concernant votre alerte de stock de médicaments, Faciliter la communication avec votre pharmacie.
            </Text>

            <Text style={styles.sectionTitle}>3. Sécurité des Données</Text>
            <Text style={styles.text}>
                Nous prenons la sécurité de vos informations très au sérieux et mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre l'accès non autorisé, la perte ou la destruction.
            </Text>

            <Text style={styles.sectionTitle}>4. Conservation des Données</Text>
            <Text style={styles.text}>
                Vos informations personnelles sont conservées aussi longtemps que nécessaire pour la fourniture de nos services, ou plus longtemps si requis par la législation en vigueur.
            </Text>

            <Text style={styles.sectionTitle}>5. Vos Droits</Text>
            <Text style={styles.text}>
                Conformément à la réglementation, vous disposez des droits suivants concernant vos données personnelles : Le droit d'accès, Le droit de rectification, Le droit à l'effacement, Le droit à la limitation du traitement, Le droit à la portabilité des données, Le droit d'opposition.
            </Text>

            <Text style={styles.sectionTitle}>6. Modifications des Termes et Conditions</Text>
            <Text style={styles.text}>
                Nous nous réservons le droit de modifier ces termes et conditions à tout moment. Les modifications entreront en vigueur immédiatement après leur publication sur notre application. Nous vous encourageons à consulter régulièrement cette page.
            </Text>

            <Text style={styles.sectionTitle}>7. Contact</Text>
            <Text style={styles.text}>
                Pour toute question ou préoccupation concernant ces termes et conditions, veuillez nous contacter à adresse email.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#444',
        marginTop: 15,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
        textAlign: 'justify',
    },
});

export default TermsScreen;