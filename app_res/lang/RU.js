const ageSufix = age => {
	if(age > 10 && age <= 14) return "лет";

	switch (age % 10) {
		case 1: return "год";
		case 2: 
		case 3: 
		case 4: return "года";
		case 5: 
		case 6: 
		case 7: 
		case 8: 
		case 9: 
		case 0:
		default: return "лет";
	}
}

export default {
	hello_world: "Привет мир!",
	to_the_main: "На главную",
	github: "Github",
	vk: "Вконтакте",
	telegram: "Telegram",
	instagram: "Instagram",
	pikabu: "Пикабу",
	contacts: "Контакты",
	about_me: age => `Привет, я Данил Захваткин, мне ${age} ${ageSufix(age)} я занимаюсь разработкой веб приложений, сайтов и другими интересными вещами.`
};