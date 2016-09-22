import React, { PropTypes } from 'react'
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  Picker,
  DatePickerAndroid,
  TouchableOpacity,
} from 'react-native'
import Button from './Button' // eslint-disable-line import/no-unresolved
import * as constants from './constants'

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 10, 0.4)',
    alignItems: 'center',
  },
  container: {
    padding: 10,
    marginTop: 50,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
  },
  label: {
    width: 150,
  },
  picker: {
    width: 100,
    height: 50,
  },
})

const displayDate = date => (
  date ?
    `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` :
    'Enter a date'
)

class SettingsModal extends React.Component {
  static propTypes = {
    filter: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onDismissModal: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }
  state = {
    sortOrder: this.props.filter.sortOrder,
    beginDate: this.props.filter.beginDate,
  }
  onSave = () => {
    this.props.onSave({
      ...this.props.filter,
      ...this.state,
    })
  }
  openDatePicker = () => {
    const { beginDate } = this.state
    const date = beginDate || new Date()
    DatePickerAndroid.open({ date })
      .then(({ action, year, month, day }) => {
        if (action !== DatePickerAndroid.dismissedAction) {
          this.setState({ beginDate: new Date(year, month, day) })
        }
      })
      .catch(({ message }) => {
        console.warn('Cannot open date picker', message);
      })
  }
  render() {
    return (
      <Modal
        animationType="fade"
        transparent
        visible={this.props.visible}
        onRequestClose={this.props.onDismissModal}
      >
        <TouchableWithoutFeedback onPress={this.props.onDismissModal}>
          <View style={styles.background}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <View style={styles.row}>
                  <Text style={styles.label}>Begin Date</Text>
                  <TouchableOpacity onPress={this.openDatePicker}>
                    <Text>{displayDate(this.state.beginDate)}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>News Desk Values</Text>
                  <View>
                    <Text>Arts</Text>
                    <Text>Fashion & Style</Text>
                    <Text>Sports</Text>
                  </View>
                </View>
                <View style={[styles.row, { alignItems: 'center' }]}>
                  <Text style={styles.label}>Sort By</Text>
                  <Picker
                    style={styles.picker}
                    mode="dropdown"
                    selectedValue={this.state.sortOrder}
                    onValueChange={by => this.setState({ sortOrder: by })}
                  >
                    <Picker.Item label="Newest" value={constants.ORDER_NEWEST} />
                    <Picker.Item label="Oldest" value={constants.ORDER_OLDEST} />
                  </Picker>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Button onPress={this.onSave}>Save</Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

export default SettingsModal
