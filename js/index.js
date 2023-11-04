//* Делать перерыв в сек
const modalWrapper = document.querySelector('.modal-wrapper');
let allModalBtn = document.querySelectorAll('[data-modal-href]');
let allModal = document.querySelectorAll('.modal');

const modalSkipBtn = document.querySelector('.modal__skip-btn');
let modal;

function closeModal() {
	modalWrapper.classList.remove('active');

	allModal.forEach((modal) => {
		modal.classList.remove('active');
	})
}


function startModal() {

	allModalBtn.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();

			if (modalWrapper.classList.contains('active')) {
				modalWrapper.classList.remove('active');
			} else {
				modalWrapper.classList.add('active');
			}

			let modalId = btn.getAttribute('data-modal-href');
			modal = document.querySelector(`#${modalId}`);

			if (modal.classList.contains('active')) {
				modal.classList.remove('active');
			} else {
				modal.classList.add('active');
			}

		})

		modalSkipBtn.addEventListener('click', () => {
			closeModal();
		})
	})
}

startModal();


let data = {
	rest: 30,
}

let currentExercises = [
	{
		name: 'Приставные шаги с разведением рук',
		image: 'shagi_v_storonu_razvedenie_ruk',
		info: `В начальном положении ноги стоят вместе. Руки держите на уровне груди, согните их до прямого угла в локтях и разведите по сторонам. Начните делать приставные шаги из стороны в сторону, поочередно подставляя одну ногу к другой. Размер шага должен быть около метра, старайтесь выполнять упражнение размашисто. Синхронно с шагами нужно делать сведение и разведение рук.
		Упражнение обеспечивает комплексную нагрузку на грудные мышцы, приводящие мышцы ног и ягодицы, руки и плечи. Приставные шаги быстро разгоняют пульс и сжигают калории.`,
		reps: 30,
	},
	{
		name: 'Сведение колена и локтей стоя',
		image: 'Koleno_k_grudi_cardio',
		info: `Ноги стоят на линии ключиц, в руки подняты над головой. На выдохе поднимаем правое колено к груди, одновременно опуская к нему локти. Далее выпрямляемся, после чего проделываем повторение, но уже левой ногой. Дополнительно немного скручиваемся корпусом, оказывая тем самым усиленную нагрузку на прямую мышцу живота. При выполнении этого кардио-упражнения для начинающих участвуют и верхняя, и нижняя часть тела, что ускоряет процесс сжигания жира.`,
		reps: 30,
	},
	{
		name: 'Удары в стороны',
		image: 'Boks_s_razvorotom',
		info: `Работаем стоя, ноги зафиксированы по вертикали плеч. Руки приводим в «боевую» стойку, удерживая кулаки возле подбородка. На выдохе поворачиваем корпус в правую сторону и совершаем удар левой рукой. На вдохе поворачиваемся обратно и проделываем аналогичное движение, но уже в левую сторону с ударом правой рукой. Это функциональное упражнение на жиросжигание, которое поможет развить плечевой пояс и проработать боковые мышцы корпуса. Отличное упражнение для укрепления сердечной мышцы без нагрузки на суставы ног.`,
		reps: 30,
	},
];

// счётчик упражнений
let currentIndex = document.querySelector('.counter__current');
let finishIndex = document.querySelector('.counter__finish');

// таймер
let timerSeconds = document.querySelector('.timer__seconds');
let timerMinutes = document.querySelector('.timer__minutes');
let timerHours = document.querySelector('.timer__hours');


// контент
let appImage = document.querySelector('.app__image');
let appTitle = document.querySelector('.app__title');

// переключатели и навигация
let nextBtn = document.querySelector('.btn__done');
let reps = nextBtn.querySelector('.btn__reps');
let minusBtn = document.querySelector('.btn__minus');
let plusBtn = document.querySelector('.btn__plus');

// нижняя навигация
let skipBtn = document.querySelector('.btn__skip');
let prevBtn = document.querySelector('.btn__prev');
let pauseBtn = document.querySelector('.btn__pause');
let isPaused = false;


function timeFormat(number) {
	if (number < 10) {
		return `0${number}`;
	}
	return number;
}

function startTimer() {
	minutes = 0;
	seconds = 0;
	hours = 0;


	timerSeconds.innerHTML = timeFormat(seconds);
	timerMinutes.innerHTML = timeFormat(minutes);
	timerHours.innerHTML = timeFormat(hours);

	let intervalId = setInterval(() => {
		if (!isPaused) {
			seconds++;
			timerSeconds.innerHTML = timeFormat(seconds);

			if (seconds > 59) {
				seconds = 0;
				timerSeconds.innerHTML = timeFormat(seconds);
				minutes++;
				timerMinutes.innerHTML = timeFormat(minutes);
			}

			if (minutes > 59) {
				minutes = 0;
				timerMinutes.innerHTML = timeFormat(minutes);
				hours++;
				timerHours.innerHTML = timeFormat(hours);
			}
		}

	}, 1000);
}

function showExercise() {
	appImage.innerHTML = `<img src="./images/${currentExercises[index].image}.gif" alt="s${currentExercises[index].name}">`
	appTitle.innerHTML = currentExercises[index].name;
	reps.innerHTML = currentExercises[index].reps;
	currentIndex.innerHTML = index + 1;
	finishIndex.innerHTML = finish + 1;
}

function endExercise() {
	appTitle.innerHTML = 'Конец';
	appImage.innerHTML = ``;
	// останавливаем таймер
	isPaused = true;
}

function startExercise() {
	index = 0;
	finish = currentExercises.length - 1;

	// сохранять какие упраженения и сколько повторений выполнено
	startTimer();
	showExercise();
}


nextBtn.addEventListener('click', () => {
	if (index < finish) {
		index++;
		showExercise();
		startRestTimer();
		showRestContent();
	} else {
		endExercise();
	}
})

// вычитание повторений
minusBtn.addEventListener('click', () => {
	if (currentExercises[index].reps > 0) {
		currentExercises[index].reps--;
		reps.innerHTML = currentExercises[index].reps;
	}
})

// добавление повторений
plusBtn.addEventListener('click', () => {
	currentExercises[index].reps++;
	reps.innerHTML = currentExercises[index].reps;

})

// пропуск упражнения
skipBtn.addEventListener('click', () => {
	if (index < finish) {
		index++;
		showExercise();
		showRestContent();
	} else {
		endExercise();
	}
})

// вернуть прошлое упражнение
prevBtn.addEventListener('click', () => {
	if (index > 0) {
		index--;
		showExercise();
	}
})

// пауза таймера 
pauseBtn.addEventListener('click', () => {
	if (!isPaused) {
		isPaused = true;
		pauseBtn.innerHTML = 'Продолжить';
	} else {
		isPaused = false;
		pauseBtn.innerHTML = 'Пауза';
	}
})




startExercise();

//*=== ОТДЫХ ===*//
// управление
let restBtnSkip = document.querySelector('.rest__skip-btn')
let restSkipBtnSeconds = restBtnSkip.querySelector('.rest-timer__seconds');
let restAddBtn = document.querySelector('.rest__btn-add');
let restPauseBtn = document.querySelector('.rest__btn-pause');

// контент
let restNextName = document.querySelector('.rest__next-name');
let restNextReps = document.querySelector('.rest__next-reps');
let restNextImage = document.querySelector('.rest__next-image');

let restSeconds = data.rest;
let restInterval;
let isRestPaused = false;

function finishRestTimer() {
	restSeconds = data.rest;
	restSkipBtnSeconds.innerHTML = restSeconds;
	clearInterval(restInterval);
}

function startRestTimer() {
	restSkipBtnSeconds.innerHTML = restSeconds;

	restInterval = setInterval(() => {
		if (!isRestPaused) {
			if (restSeconds > 1) {
				restSeconds--;
				restSkipBtnSeconds.innerHTML = restSeconds;
			} else {
				closeModal();
				finishRestTimer();
			}
		}

	}, 1000)
}

restAddBtn.addEventListener('click', () => {
	restSeconds += 10;
	restSkipBtnSeconds.innerHTML = restSeconds;
})

restPauseBtn.addEventListener('click', () => {
	if (!isRestPaused && !isPaused) {
		isRestPaused = true;
		isPaused = true;
		restPauseBtn.innerHTML = 'Продолжить';
	} else {
		isRestPaused = false;
		isPaused = false;
		restPauseBtn.innerHTML = 'Пауза';
	}
});

restBtnSkip.addEventListener('click', () => {
	closeModal();
	finishRestTimer();

	if (index === finish) {
		createFinishModal();
	}
})

// контент
function showRestContent() {
	restNextName.innerHTML = currentExercises[index].name;
	restNextReps.innerHTML = currentExercises[index].reps;
	restNextImage.innerHTML = `<img src="./images/${currentExercises[index].image}.gif" alt="s${currentExercises[index].name}">`
}




//* FINISH *//
function createFinishModal() {
	nextBtn.setAttribute('data-modal-href', 'finish');
}