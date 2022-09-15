import { Button, TextInput, View } from "react-native";
import {styles} from './styles'

const Input = ({item, onChangeText, placeholder, AddItem, textButton}) => {
    return ( 
        <>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder= {placeholder}
                    style={styles.input} 
                    onChangeText={onChangeText}
                    value= {item}
                />
                <Button 
                    title={textButton}
                    color='#274C77' 
                    onPress={AddItem}
                />
            </View>
        </>
     );
}
 
export default Input;