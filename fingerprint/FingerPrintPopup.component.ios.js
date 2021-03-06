import React, { Component, PropTypes } from 'react';
import { AlertIOS } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

class IOSFingerprintPopup extends Component {

    componentDidMount() {
        FingerprintScanner
            .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
            .then(() => {
                this.props.handlePopupDismissed();
                AlertIOS.alert('Authenticated successfully');
            })
            .catch((error) => {
                this.props.handlePopupDismissed();
                AlertIOS.alert(error.message);
            });
    }

    render() {
        return false;
    }
}

IOSFingerprintPopup.propTypes = {
    handlePopupDismissed: PropTypes.func.isRequired,
};

export default IOSFingerprintPopup;