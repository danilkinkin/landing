window.renderPage = ()=>{
	console.log("Render page");

	app.body
		.append(
			UI.create("header")
				.append(
					UI.create().class("header-content")
						.append(
							UI.create("h1")
								.content("Danilkinkin")
						).append(
							UI.create("p")
								.class("ahead-title")
								.content("Web разработчик и UI дизайнер")
						).append(
							UI.create("p")
								.content("Привет, я Данил Захваткин, \
									мне 20 и я занимаюсь разработкой web приложений, \
									сайтов и так же немного увлекаюсь web дизайном.")
						).append(
							UI.create()
								.class("menu")
								.append(
									UI.create("a").attribute("href", "").content("Контакты")
								).append(
									UI.create("a").attribute("href", "").content("Работы")
								).append(
									UI.create("a").attribute("href", "").content("Резюме")
								).append(
									UI.create("a").attribute("href", "").content("hello@danilkinkin.com")
								)
						)
				)
		).append(
			UI.create("main").content("main")
		).append(
			UI.create("footer").content("footer")
		);
}