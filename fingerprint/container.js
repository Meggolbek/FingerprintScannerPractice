import React, { Component } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import App from '../App'
import styles from './container.styles';
import FingerprintPopup from './FingerPrintPopup.component';

class Application extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: undefined,
            popupShowed: false,
            abletoScan: true,
        };
    }

    handleFingerprintShowed = () => {
        this.setState({ popupShowed: true });
    };

    handleFingerprintDismissed = () => {
        this.setState({ popupShowed: false });
    };

    componentDidMount() {
        FingerprintScanner
            .isSensorAvailable()
            .catch(error => this._handleError(error));
    }

    render() {
        const { errorMessage, popupShowed } = this.state;
        return (
        this.state.abletoScan ? (

            <View style={styles.container} flex={1}>

                <Text style={styles.heading}>
                    Fingerprint Scanner
                </Text>
                <Text style={styles.subheading}>
                    Please click the icon below to begin scanning.
                </Text>

                <TouchableOpacity
                    style={styles.fingerprint}
                    onPress={this.handleFingerprintShowed}
                    disabled={!!errorMessage}
                >
                    <Image source={require('./assets/finger_print.png')} />
                </TouchableOpacity>

                {errorMessage && (
                    <Text style={styles.errorMessage}>
                        {errorMessage}
                    </Text>
                )}

                {popupShowed && (
                    <FingerprintPopup
                        style={styles.popup}
                        handlePopupDismissed={this.handleFingerprintDismissed}
                    />
                )}

            </View> ) : (
                    <View style={styles.container}>
                        <App />
                    </View>
        )
        );
    }
    _handleError(error) {
        if(error == "FingerprintScannerNotSupported: Device does not support Fingerprint Scanner."){
        this.setState({abletoScan: false})
    }
        this.setState({ errorMessage: error.message })

    }
}

export default Application;