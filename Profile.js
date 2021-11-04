import * as React from 'react';
import { View, Button, Text, Animated, TextInput, StyleSheet } from 'react-native';

export default function Profile({ navigation, route }) {
    const [isShown, setShown] = React.useState(false);
    const [firstname, onChangeFirstname] = React.useState(null);
    const [lastname, onChangeLastname] = React.useState(null);
    const [protein, onChangeProtein] = React.useState(0);
    const [calories, onChangeCalories] = React.useState(0);
    const [carbs, onChangeCarbs] = React.useState(0);
    const [fat, onChangeFat] = React.useState(0);
    const [activity, onChangeActivity] = React.useState(0);
    const url = "http://cs571.cs.wisc.edu:5000/users/" + route.params.username;

    const save = () => {
        if (isNaN(protein) || !protein || (protein && !protein.toString().replace( /\s/g, ''))){
            alert("Daily proteins must be a number!");
            return;
        }
        if (isNaN(calories) || !calories || (calories && !calories.toString().replace( /\s/g, ''))){
            alert("Daily calories must be a number!");
            return;
        }
        if (isNaN(carbs) || !carbs || (carbs && !carbs.toString().replace( /\s/g, ''))){
            alert("Daily carbs must be a number!");
            return;
        }
        if (isNaN(fat) || !fat || (fat && !fat.toString().replace( /\s/g, ''))){
            alert("Daily fat must be a number!");
            return;
        }
        if (isNaN(activity) || !activity || (activity && !activity.toString().replace( /\s/g, ''))){
            alert("Daily activity must be a number!");
            return;
        }
        fetch(url, {
			method: 'PUT',
			headers: {
                'Accept': 'application/json',
			    'Content-Type': 'application/json',
			    'x-access-token': route.params.token,
            },
			body: JSON.stringify ({
				firstName: firstname,
				lastName: lastname,
                goalDailyProtein: protein,
                goalDailyCalories: calories,
                goalDailyCarbohydrates: carbs,
                goalDailyFat: fat,
				goalDailyActivity: activity,
			})
		})
        .then(res => res.json())
        .then(res => {alert(res.message)});
    }
    
    React.useEffect(() => {
        if (!isShown) {
            fetch(url, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'x-access-token': route.params.token,
                },
                
            })
            .then(res => res.json())
            .then(res => {
                onChangeFirstname(res.firstName), 
                onChangeLastname(res.lastName), 
                onChangeProtein(res.goalDailyProtein), 
                onChangeCalories(res.goalDailyCalories), 
                onChangeCarbs(res.goalDailyCarbohydrates),
                onChangeFat(res.goalDailyFat),
                onChangeActivity(res.goalDailyActivity)})
            .then(res => setShown(true));
        }

        
    });


    const styles = StyleSheet.create({
        input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          width: 150,
        },
        h1: {
          fontSize: 30,
          fontWeight: 'bold',
        },
        button: {
          marginHorizontal: 5,
          marginTop: 5,
        },
      });

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.h1}>About Me</Text>
        <Text>Let's get to know you!</Text>
        <Text>Specify your information below.</Text>
        <Text>Personal Information</Text>
        <Text>First Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeFirstname}
          value={firstname == null ? '' : firstname.toString()}
          placeholder="Bukcy"
        />
        <Text>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeLastname}
          value={lastname == null ? '' : lastname.toString()}
          placeholder="Badger"
        />

        <Text>Fitness Goals</Text>
        <Text>Daily Calories (kcal)</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeCalories}
          value={calories == null ? '' : calories.toString()}
        />
        <Text>Daily Proteins (grams)</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeProtein}
          value={protein == null ? '' : protein.toString()}
        />
        <Text>Daily Carbs (grams)</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeCarbs}
          value={carbs == null ? '' : carbs.toString()}
        />
        <Text>Daily Fat (grams)</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeFat}
          value={fat == null ? '' : fat.toString()}
        />
        <Text>Daily Activity (mins)</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeActivity}
          value={activity == null ? '' : activity.toString()}
        />

        <Text>Looks good! All set?</Text>

        <View style={{ flexDirection:"row" }}>
          <View style={styles.button}>
              <Button title="Save Profile" onPress={save} />
          </View>
          <View style={styles.button}>
              <Button title="Exit" onPress={()=> navigation.navigate('Login')}/>
          </View>
        </View>
      </View>
    );
  }