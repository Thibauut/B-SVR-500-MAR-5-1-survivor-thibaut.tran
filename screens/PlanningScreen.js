import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import Swiper from 'react-native-swiper';
import DateTimePicker from '@react-native-community/datetimepicker';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (index) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + index);
    setCurrentMonth(newMonth);
  };

  const handleTimeChange = (event, time) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }

    if (time !== undefined) {
      setSelectedTime(time.toLocaleTimeString());
    }
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => this.datePicker.show()} style={{ padding: 10 }}>
        <Text>Sélectionner une date</Text>
      </TouchableOpacity>

      <Swiper
        horizontal={true}
        loop={false}
        onIndexChanged={handleMonthChange}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <DatePicker
            mode="calendar"
            onDateChange={handleDateChange}
            ref={(ref) => (this.datePicker = ref)}
            isShow={false}
            date={currentMonth}
            style={{ width: 300, backgroundColor: 'white' }}
            customStyles={{
              headerStyle: {
                backgroundColor: 'white',
              },
              headerText: {
                color: 'black',
              },
              dayHeaderStyle: {
                backgroundColor: 'white',
              },
              dayTextStyle: {
                color: 'black',
              },
              selectedDayStyle: {
                backgroundColor: 'blue',
              },
              selectedDayTextColor: 'white',
            }}
          />

          {selectedDate ? (
            <View>
              <Text>Date sélectionnée: {selectedDate}</Text>
              <TouchableOpacity onPress={showTimePickerModal}>
                <Text>Sélectionner l'heure</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  onChange={handleTimeChange}
                />
              )}
              {selectedTime && (
                <Text>Heure sélectionnée: {selectedTime}</Text>
              )}
            </View>
          ) : (
            <Text>Aucune date sélectionnée</Text>
          )}
        </View>
      </Swiper>
    </View>
  );
};

export default CalendarComponent;

// return (
// <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
//     <View style={styles.container}>
//       <Text style={{fontSize: 40, fontWeight: 'bold', padding: '7%'}}>Planning 📅</Text>
//     </View>
//   </SafeAreaView>
// );