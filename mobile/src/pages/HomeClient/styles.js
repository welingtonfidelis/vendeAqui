import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
    categoryTitle: {
        fontSize: 18,
        color: '#F2BB16',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    containerCategory: {
        marginEnd: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    categoryImage: {
        width: 90,
        height: 120,
        resizeMode: 'stretch',
        borderRadius: 8,
    },
    catetegoryText: {
        fontSize: 16,
        color: '#646464',
    },

    containerCompany: {
        flexDirection: 'row',
        backgroundColor: '#F3F3F3',
        marginBottom: 8,
        borderRadius: 8,
    },
    companyImage: {
        width: 95,
        height: 95,
        resizeMode: 'stretch',//contain
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 8,
    },
    companyInfo: {
        flex: 1,
    },
    companyName: {
        backgroundColor: '#F2BB16',
        fontWeight: 'bold',
        fontSize: 15,
        paddingVertical: 7,
        borderTopRightRadius: 8,
        paddingStart: 10,
    },
    companyInfoAdr: {
        paddingStart: 10,
        marginBottom: 4,
    },
    companyInfoPhon: {
        paddingStart: 10,
    },
});
