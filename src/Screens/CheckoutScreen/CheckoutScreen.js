import { StyleSheet } from 'react-native';

const getStyles = (myColors) => StyleSheet.create({
safe: {
    flex: 1,
    backgroundColor: myColors.primary
},
BottomSheet: {
    flex: 1,
    padding: 10,
},
container: {
    padding: 20,
},
header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: myColors.text
},
input: {
    marginBottom: 10,
    color: myColors.text
},
subheader: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    color: myColors.text
},
deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
highlightButton: {
    flex: 1,
    height: 100,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'column',
},
highlightButtonText: {
    marginTop: 10,
    fontSize: 16,
    color: myColors.text
},
button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: myColors.clickable
},
buttonText: {
    fontSize: 18,
    color: myColors.text
},
locationText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20,
    color: myColors.text
},
selectedDateText: {
    marginTop: 10,
    fontSize: 16,
    color: myColors.text
},
map: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 30,
    padding: 150,
},
label: {
    marginBottom: 10,
    color: myColors.text
},
horiz: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
},
inputContainer: {
    flex: 1,
    marginHorizontal: 5,
},
});

export default getStyles;
