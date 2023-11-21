let render = {
  pauseBtn: `<svg width="32" height="47" viewBox="0 0 32 47" xmlns="http://www.w3.org/2000/svg" >
	 <path fill-rule="evenodd" clip-rule="evenodd" d="M27.5384 0.0512695C25.4142 0.0512695 23.6923 1.77326 23.6923 3.89743V42.359C23.6923 44.4832 25.4142 46.2052 27.5384 46.2052C29.6626 46.2052 31.3846 44.4832 31.3846 42.359V3.89744C31.3846 1.77326 29.6626 0.0512695 27.5384 0.0512695ZM4.46164 0.0513078C2.33746 0.0513078 0.615479 1.77329 0.615479 3.89747V42.359C0.615479 44.4832 2.33746 46.2052 4.46164 46.2052C6.58582 46.2052 8.30781 44.4832 8.30781 42.359V3.89747C8.30781 1.7733 6.58582 0.0513078 4.46164 0.0513078Z"/>
	  </svg>`,
  playBtn: `<svg width="31" height="33" viewBox="0 0 31 33" xmlns="http://www.w3.org/2000/svg" style="margin-left: 5px;">
	 <path fill-rule="evenodd" clip-rule="evenodd" d="M26.2828 23.5439C31.4441 20.564 31.4441 13.1143 26.2828 10.1345L11.7667 1.7536C6.60542 -1.22626 0.153809 2.49857 0.153809 8.45831V25.22C0.153809 31.1798 6.60542 34.9046 11.7667 31.9247L26.2828 23.5439ZM25.0087 19.7746C27.0087 18.6199 27.0087 15.7331 25.0087 14.5784L8.84739 5.24773C6.84739 4.09304 4.34739 5.53641 4.34739 7.84581V26.5072C4.34739 28.8166 6.84739 30.26 8.84739 29.1053L25.0087 19.7746Z"/>
	 </svg>`,

  checkbox: {
    true: `<svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0ZM22.2577 9.81748C22.7091 9.12289 22.5121 8.19382 21.8175 7.74233C21.1229 7.29085 20.1938 7.48793 19.7423 8.18252L12.9646 18.6098L9.074 14.6195C8.49568 14.0264 7.546 14.0143 6.95285 14.5927C6.3597 15.171 6.34767 16.1207 6.926 16.7138L12.126 22.0471C12.4442 22.3735 12.8935 22.5375 13.347 22.4928C13.8006 22.4481 14.2093 22.1996 14.4577 21.8175L22.2577 9.81748Z"/>
		</svg>`,
    false: `<svg class="stroke" stroke="currentColor" fill="none" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
		<rect x="1.5" y="1.5" width="27" height="27" rx="13.5" stroke-width="3"/>
		</svg>`,
  },
};

function createNumberControl(allInputEl) {
  allInputEl.forEach((input) => {
    let controlBox = document.createElement("div");
    controlBox.setAttribute("class", "number-control-box");

    let controlPlusBtn = document.createElement("button");
    controlPlusBtn.setAttribute("data-number-control-btn", "plus");
    controlPlusBtn.classList.add("number-control-box__btn");
    controlPlusBtn.classList.add("number-control-box__btn-plus");
    controlPlusBtn.innerHTML = `<span>+</span>`;

    let controlMinusBtn = document.createElement("button");
    controlMinusBtn.setAttribute("data-number-control-btn", "minus");
    controlMinusBtn.classList.add("number-control-box__btn");
    controlMinusBtn.classList.add("number-control-box__btn-minus");
    controlMinusBtn.innerHTML = `<span>-</span>`;

    let inputParent = input.parentElement;
    let inputNextElement = input.nextElementSibling;
    let inputSteps = input.getAttribute("data-number-control-steps");

    // если у инпута нет дальше следующего элемента
    if (!inputNextElement) {
      inputParent.insertAdjacentElement("beforeend", controlBox);
    } else {
      inputParent.insertBefore(controlBox, inputNextElement);
    }
    inputParent.removeChild(input);
    controlBox.insertAdjacentElement("afterbegin", controlMinusBtn);
    controlBox.appendChild(input);
    controlBox.insertAdjacentElement("beforeend", controlPlusBtn);

    controlMinusBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (input.getAttribute("min") < input.value) {
        if (inputSteps) {
          input.value -= inputSteps;
        } else {
          input.value--;
        }
      }

      if (!input.getAttribute("min")) {
        if (inputSteps) {
          input.value -= inputSteps;
        } else {
          input.value--;
        }
      }
    });

    controlPlusBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (input.getAttribute("max") > input.value) {
        if (inputSteps) {
          console.log(inputSteps);
          input.value = parseInt(input.value) + parseInt(inputSteps);
        } else {
          input.value++;
        }
      }

      if (!input.getAttribute("max")) {
        if (inputSteps) {
          input.value = parseInt(input.value) + parseInt(inputSteps);
        } else {
          input.value++;
        }
      }
    });
  });
}

function renderTimerUnit(array, unit) {
  array.forEach((item) => {
    item.innerHTML = timeFormat(unit);
  });
}

function deleteHtmlTags(htmlString) {
  return htmlString.replace(/(<([^>]+)>)/gi, "").trim();
}

function convertToMinutes(time) {
  let array = time.split(":");
  let hours = parseInt(array[0]);
  let minutes = parseInt(array[1]);
  let seconds = parseInt(array[2]);

  return Math.floor(minutes + hours * 60 + seconds / 60);
}

function countReps(array) {
  let allReps = 0;
  for (item of array) {
    allReps += item.reps;
  }
  return allReps;
}

const modalWrapper = document.querySelector(".modal-wrapper");
let allModalBtn;
let allModal = document.querySelectorAll(".modal");
let allModalCloseBtn = document.querySelectorAll(".modal__btn-close");

const modalSkipBtn = document.querySelector(".modal__skip-btn");
let modal;
let body;

function uptadeModalBtn() {
  allModalBtn = document.querySelectorAll("[data-modal-href]");
}

function closeModal() {
  modalWrapper.classList.remove("active");
  //  body.classList.remove("no-scroll");

  allModal.forEach((modal) => {
    modal.classList.remove("active");
  });
}

function startModal() {
  body = document.body;
  uptadeModalBtn();
  allModalBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      if (modalWrapper.classList.contains("active")) {
        modalWrapper.classList.remove("active");
        //  body.classList.remove("no-scroll");
      } else {
        modalWrapper.classList.add("active");
        //  body.classList.add("no-scroll");
      }

      let modalId = btn.getAttribute("data-modal-href");
      modal = document.querySelector(`#${modalId}`);

      if (modal.classList.contains("active")) {
        modal.classList.remove("active");
      } else {
        modal.classList.add("active");
      }
    });

    modalSkipBtn.addEventListener("click", () => {
      closeModal();
    });
  });
}

allModalCloseBtn.forEach((closeBtn) => {
  closeBtn.addEventListener("click", closeModal);
});
startModal();

//* START APP*//
//Table
let startTable = document.querySelector(".start-table");
function renderStartTable(table, exercises) {
  for (let exercise of exercises) {
    let { name, image, reps, willDo } = exercise;

    table.innerHTML += `<tr class="${willDo}">
		<td class="start-table__image">
		  <img src="./images/${image}.gif" alt="${name}" />
		</td>
		<td class="start-table__content">
		  <h4 class="start-table__name">${name}</h4>
		  <div class="start-table__reps">
			 <p class="start-table__reps-text">Кол-во повторений:</p>
			 <div class="start-table__reps-counter">
				<input
				  class="start-table__reps-input"
				  type="number"
				  id=""
				  min="1"
				  value="${reps}"
				  data-number-control
				/>
			 </div>
		  </div>
		</td>
		<td class="start-table__remove">
		  <button class="start-table__remove-btn btn" type="button">
			 <svg
				width="46"
				height="46"
				viewBox="0 0 46 46"
				xmlns="http://www.w3.org/2000/svg"
			 >
				<path
				  fill-rule="evenodd"
				  clip-rule="evenodd"
				  d="M1.46447 8.53553C-0.488156 6.58291 -0.488155 3.41709 1.46447 1.46447C3.41709 -0.488156 6.58291 -0.488155 8.53553 1.46447L22.6777 15.6066L36.8198 1.46447C38.7724 -0.488156 41.9383 -0.488155 43.8909 1.46447C45.8435 3.41709 45.8435 6.58291 43.8909 8.53553L29.7487 22.6777L43.8909 36.8198C45.8435 38.7724 45.8435 41.9383 43.8909 43.8909C41.9383 45.8435 38.7724 45.8435 36.8198 43.8909L22.6777 29.7487L8.53553 43.8909C6.58291 45.8435 3.41709 45.8435 1.46447 43.8909C-0.488155 41.9383 -0.488155 38.7724 1.46447 36.8198L15.6066 22.6777L1.46447 8.53553Z"
				/>
			 </svg>
		  </button>
		</td>
	 </tr>`;
  }
}
let exercises = {
  "Кардио без прыжков": [
    {
      name: "Приставные шаги с разведением рук",
      image: "shagi_v_storonu_razvedenie_ruk",
      info: `В начальном положении ноги стоят вместе. Руки держите на уровне груди, согните их до прямого угла в локтях и разведите по сторонам. Начните делать приставные шаги из стороны в сторону, поочередно подставляя одну ногу к другой. Размер шага должен быть около метра, старайтесь выполнять упражнение размашисто. Синхронно с шагами нужно делать сведение и разведение рук.
			  Упражнение обеспечивает комплексную нагрузку на грудные мышцы, приводящие мышцы ног и ягодицы, руки и плечи. Приставные шаги быстро разгоняют пульс и сжигают калории.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Сведение колена и локтей стоя",
      image: "Koleno_k_grudi_cardio",
      info: `Ноги стоят на линии ключиц, в руки подняты над головой. На выдохе поднимаем правое колено к груди, одновременно опуская к нему локти. Далее выпрямляемся, после чего проделываем повторение, но уже левой ногой. Дополнительно немного скручиваемся корпусом, оказывая тем самым усиленную нагрузку на прямую мышцу живота. При выполнении этого кардио-упражнения для начинающих участвуют и верхняя, и нижняя часть тела, что ускоряет процесс сжигания жира.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Удары в стороны",
      image: "Boks_s_razvorotom",
      info: `Работаем стоя, ноги зафиксированы по вертикали плеч. Руки приводим в «боевую» стойку, удерживая кулаки возле подбородка. На выдохе поворачиваем корпус в правую сторону и совершаем удар левой рукой. На вдохе поворачиваемся обратно и проделываем аналогичное движение, но уже в левую сторону с ударом правой рукой. Это функциональное упражнение на жиросжигание, которое поможет развить плечевой пояс и проработать боковые мышцы корпуса. Отличное упражнение для укрепления сердечной мышцы без нагрузки на суставы ног.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Подъем колена из полувыпада (левая нога)",
      image: "Podtygivanie_kolena_k_grudi_ruki_v_zamke",
      info: `Слегка согните ноги, сведите руки перед собой в замок и наклоните корпус вперед. Вес тела перенесите на правую ногу, а левую отведите назад. Начните совершать подъем колена к уровню низа груди. Проделываем нужное число повторений в интенсивном темпе, после чего меняем ноги. Элемент кардио-тренировки дома без бега и прыжков отлично прорабатывает низ пресса, ноги, ягодицы а также укрепляет поясничный отдел.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Подъем колена из полувыпада (правая нога)",
      image: "Podtygivanie_kolena_k_grudi_ruki_v_zamke",
      info: `Слегка согните ноги, сведите руки перед собой в замок и наклоните корпус вперед. Вес тела перенесите на правую ногу, а левую отведите назад. Начните совершать подъем колена к уровню низа груди. Проделываем нужное число повторений в интенсивном темпе, после чего меняем ноги. Элемент кардио-тренировки дома без бега и прыжков отлично прорабатывает низ пресса, ноги, ягодицы а также укрепляет поясничный отдел.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Приставные шаги в полуприседе",
      image: "Pristavnoj_shag_v_poluprisede",
      info: `Слегка сгибаем колени в неглубоком полуприседе и фиксируем положение. В ногах вы почувствуете умеренное напряжение, корпус немного наклоните вперед. После чего сделайте приставной шаг в правую сторону на счет «раз-два». Аналогично вернитесь в исходную позицию и сделайте еще один шаг, но уже в левую сторону. Элемент кардио-тренировки для начинающих увеличивает статическую силу ног, подтягивает проблемные зоны, а также акцентирует нагрузку в отводящих и приводящих мышцах бедер. Подъемы рук позволяют еще быстрее разогнать пульс и сжечь больше калорий, а также укрепить мышцы плеч и трицепсов.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Шаги с касанием пяток",
      image: "Podskoki_s_kasaniem_stopy",
      info: `Расставьте ноги шире плеч и слегка согните их в коленях. Поднимаем правую стопу выше левого колена, после чего касаемся ее левой рукой. Далее поднимаем левую стопу выше правого колена и касаемся ее правой ладонью. В результате таких перекрестных движений вы сможете укрепить приводящие мышцы бедра, избавляясь от жировых отложений на ногах. Дополнительно участвует мускулатура живота, уходят проблемные зоны в области пояса.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Махи ногой с касанием ладонью",
      image: "Mahi_nogami",
      info: `Выполните мах правой ногой перед собой, слегка отводя ее в левую сторону. В пиковой точке конечность должна образовать параллель с полом. Одновременно с этим коснитесь носка поднятой ноги пальцами левой руки, после чего вернитесь в исходное положение. Очередное повторение сопровождается сменой сторон. Простое и эффективное упражнение для сжигания жира в области пояса. Если вам тяжело поднимать прямую ногу, то сгибайте ее в колене.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Отведение ног в сторону с подъемом рук",
      image: "Shag_v_storonu_podemy_ruk-1",
      info: `Руки сведите перед собой на поясе, а ноги поставьте вплотную друг к другу. На выдохе выполните отведение правой ноги в стороны, а руки поднимите вверх. На вдохе вернитесь в исходное положение, после чего проделайте аналогичное движение с отведением уже левой ноги. В конкретном случае основная нагрузка приходится на отводящие мышцы бедра и плечи, однако во время таких кардио-упражнений происходит жиросжигание во всем теле.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Перекрестные подъемы коленей",
      image: "Kosie_podemy_kolen",
      info: `Ноги расставлены шире плеч, руки по бокам корпуса, спина прямая. Поднимите правое колено к уровню левой груди, одновременно работая руками аналогично классическому бегу. В верхнем положении левый локоть должен касаться правого колена. Верните ногу обратно, после чего совершите движение левой ногой по обратной амплитуде. Работаем в интенсивном темпе, чередуя стороны на каждое повторение. Упражнение из кардио-тренировки для начинающих отлично разгоняет обменные процессы, прорабатывает квадрицепсы и низ пресса.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Приседания с махами руками",
      image: "Prisedanie_mahi_rukami",
      info: `Поставьте ноги по вертикали плеч и поднимите руки над собой. Совершите присед до прямого угла в сгибе коленей и опустите руки. С усилием поднимитесь, вновь вытягивая руки над собой. Элемент кардио в домашних условиях без прыжков обеспечивает колоссальную нагрузку на ноги, позволяя увеличить их силу, объем и мышечный рельеф. Не меньше работают мышцы рук за счет подъемов, еще больше ускоряя жиросжигание.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Подтягивание колена к ладоням (левая нога)",
      image: "Podtyagivanie_kolenej_k_grudi",
      info: `Находясь в положении стоя, перенесите вес тела на левую ногу, правую немного отведите в сторону, а руки поднимите над собой. Теперь поднимите правое колено к уровню солнечного сплетения, опустите на него ладони, после чего вернитесь в исходное положение. Интенсивно выполняем нужное число повторений и меняем сторону. Акцент нагрузки приходится на квадрицепсы, ягодицы, зону пояса и средний и передний пучок дельт. Одно из лучших упражнений для похудения в животе.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Подтягивание колена к ладоням (правая нога)",
      image: "Podtyagivanie_kolenej_k_grudi",
      info: `Находясь в положении стоя, перенесите вес тела на левую ногу, правую немного отведите в сторону, а руки поднимите над собой. Теперь поднимите правое колено к уровню солнечного сплетения, опустите на него ладони, после чего вернитесь в исходное положение. Интенсивно выполняем нужное число повторений и меняем сторону. Акцент нагрузки приходится на квадрицепсы, ягодицы, зону пояса и средний и передний пучок дельт. Одно из лучших упражнений для похудения в животе.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Альпинист",
      image: "Planka_nizkoudarnyj_alpinist_2",
      info: `Находясь в классическом упоре лежа, поднимите правое колено к уровню груди, верните его обратно, после чего проделайте аналогичное движение левым коленом. Линия шеи, спина и бедер остается прямой без изгибов и провисаний. Это низкоударное упражнение очень быстро разгоняет пульс, повышает эффективность тренировки и качественно подтягивает все тело – в особенности зону живота.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Боковые наклоны с подъемом колена",
      image: "Naklony_koleno_lokot_cardio",
      info: `Руки сведены на затылке с развернутыми локтями. Поднимите правое колено в сторону, одновременно наклоняясь к нему корпусом. После касания локтя и колено вернитесь в начальную позицию, смените сторону и проделайте аналогичное движение. Элемент кардио в домашних условиях без прыжков обеспечивает акцентированную проработку боковых мышц талии. Уйдут бока, сформируется красивая зона пояса.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Колено-локоть с поворотом корпуса",
      image: "Koleno_lokot_ruki_vverh",
      info: `Ноги на ширине плеч, руки вытянуты над собой. Поднимите правое колено к левой груди, поверните корпус и опустите руки перед собой, касаясь поверхности колена левым локтем. Вернувшись в исходную позицию, проделайте очередное повторение со сменой сторон. Упражнение прорабатывает косые мышцы, передний и средний пучок дельт, а также квадрицепсы. Несмотря на кажущуюся легкость, кардио-упражнение является одним из самых эффективных для похудения в области живота, рук и ног.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Захлесты голеней с разведением рук",
      image: "Zahlesty_goleni_razvedenie_ruk_cardio",
      info: `Разведите ноги шире плеч, а руки выпрямите перед собой. Перенесите вес тела на левую ногу, совершите захлест правой голени, одновременно разводя руки в сторону, поддерживая их параллельно полу. Следующее движение сопровождается сменой сторон. В ходе работы основную нагрузку получают бицепсы бедер, передний и задний пучки дельт, грудные мышцы. Уже с первого упражнения вы разгоните пульс и запустите жиросжигание.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Присед + колено и локоть",
      image: "Prised_koleno_lokot",
      info: `Сведите ладони на затылке, а локти расправьте в противоположные стороны. Ноги зафиксированы на ширине плеч. Сделайте присед, после чего поднимите правое колено, поверните корпус и коснитесь левым локтем его поверхности. Вернитесь в исходную позицию, присядьте снова, после чего поднимите левое колено и вновь выполните аналогичный поворот корпуса. Упражнение отлично прорабатывает мышцы ног и косые мышцы живота.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Удар ногой + полувыпад",
      image: "Udary_nogoj_vpered_s_kasaniem_pola",
      info: `Поставьте руки на пояс и сделайте удар правой ногой перед собой. После этого совершите обратный полувыпад, отводя назад левую ногу. Левая рука в нижней точке должна коснуться пола. Выполняйте целый подход на одну ногу, затем поменяйте стороны. Элемент не только активно разгоняет обмен веществ, но также помогает проработать рельеф ног.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
    {
      name: "Перекрестные касания ладони и колена в упоре лежа",
      image: "Planka_kasanie_kolena",
      info: `Примите упор лежа, придав телу форму ровной линии. Поднимите правое колено к уровню левой груди, после чего коснитесь его левой ладонью. На очередное повторение смените стороны, чередуя их на протяжении всего подхода. Упражнение отлично развивает координацию движений, мышцы-стабилизаторы, квадрицепсы, а также увеличивает статическую силу рук, пресса и поясницы. Одно из лучших упражнений для общего похудения тела.`,
      reps: 20,
      isFinished: false,
      willDo: true,
    },
  ],
};
let currentExercises = [];

let data = {
  rest: 30,
  ccalBurned: 10,
  percentBurned: {
    cardio: 7,
    mix: 14,
    power: 14,
  },
  finishReps: 0,
  allReps: countReps(currentExercises),
};

function startNewTraining() {
  // перенос из объекта в текущую тренировку
  exercises["Кардио без прыжков"].forEach((exercise) => {
    if (exercise.willDo) {
      currentExercises.push(exercise);
    }
  });

  calculateStartStats();
}

function calculateStartStats() {
  let exercisesCounterEl = document.querySelector(
    ".start-stats__item-exercises span"
  );
  let exercisesCcalEl = document.querySelector(".start-stats__item-ccal span");
  let exercisesTimeEl = document.querySelector(
    ".start-stats__item-duration span"
  );

  let exercisesCounter = 0;
  let exercisesReps = 0;
  let exercisesTime = 0;

  exercisesCounterEl.innerHTML = exercisesCounter;

  // ! РАСЧИТАЙ ккал исходя из времени

  exercises["Кардио без прыжков"].forEach((exercise) => {
    if (exercise.willDo) {
      exercisesCounter++;
      exercisesReps += exercise.reps;
      exercisesCounterEl.innerHTML = exercisesCounter;
      exercisesTimeEl.innerHTML = exercisesTime;
    } else {
      exercisesCounterEl.innerHTML = exercisesCounter;
      exercisesTimeEl.innerHTML = exercisesTime;
    }
  });
  exercisesTime = Math.floor(
    (exercisesReps * 2 + data.rest * (exercisesCounter - 1)) / 60
  );
  exercisesTimeEl.innerHTML = exercisesTime > 0 ? exercisesTime : 0;
  let ccal = exercisesTime * data.ccalBurned;
  ccal += Math.floor((ccal * data.percentBurned.cardio) / 100);
  exercisesCcalEl.innerHTML = ccal > 0 ? ccal : 0;
}

renderStartTable(startTable, exercises["Кардио без прыжков"]);
let allStartTableRemoveBtn = document.querySelectorAll(
  ".start-table__remove-btn"
);
startNewTraining();

allStartTableRemoveBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let parentRow = btn.parentElement.parentElement;
    let currentExerciseName =
      parentRow.querySelector(".start-table__name").innerHTML;

    if (parentRow.classList.contains("hide")) {
      parentRow.classList.remove("hide");
      for (let exercise of exercises["Кардио без прыжков"]) {
        if (exercise.name === currentExerciseName) {
          exercise.willDo = true;
        }
      }
      calculateStartStats();
    } else {
      parentRow.classList.add("hide");
      for (let exercise of exercises["Кардио без прыжков"]) {
        if (exercise.name === currentExerciseName) {
          exercise.willDo = false;
        }
      }
      calculateStartStats();
    }
  });
});

// счётчик упражнений
let allCurrentIndex = document.querySelectorAll(".counter__current");
let allFinishIndex = document.querySelectorAll(".counter__finish");

// таймер
let allTimerSeconds = document.querySelectorAll(".timer__seconds");
let allTimerMinutes = document.querySelectorAll(".timer__minutes");
let allTimerHours = document.querySelectorAll(".timer__hours");

function timeFormat(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}

// контент
let appImage = document.querySelector(".app__image");
let appTitle = document.querySelector(".app__title");

// переключатели и навигация
let nextBtn = document.querySelector(".btn__done");
let reps = nextBtn.querySelector(".btn__reps");
let minusBtn = document.querySelector(".btn__minus");
let plusBtn = document.querySelector(".btn__plus");

// нижняя навигация
let skipBtn = document.querySelector(".btn__skip");
let prevBtn = document.querySelector(".btn__prev");
let pauseBtn = document.querySelector(".btn__pause");
let isPaused = false;

function startTimer() {
  seconds = 0;
  minutes = 0;
  hours = 0;

  renderTimerUnit(allTimerSeconds, seconds);
  renderTimerUnit(allTimerMinutes, minutes);
  renderTimerUnit(allTimerHours, hours);

  let intervalId = setInterval(() => {
    if (!isPaused) {
      seconds++;
      renderTimerUnit(allTimerSeconds, seconds);

      if (seconds > 59) {
        seconds = 0;
        renderTimerUnit(allTimerSeconds, seconds);
        minutes++;
        renderTimerUnit(allTimerMinutes, minutes);
      }

      if (minutes > 59) {
        minutes = 0;
        renderTimerUnit(allTimerMinutes, minutes);
        hours++;
        renderTimerUnitrenderTimerUnit(allTimerHours, hours);
      }
    }
  }, 1000);
}

function showExercise() {
  // показывать/скрывать кнопки переключения упражнения
  if (index === 0) {
    prevBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
  }

  if (index === finish) {
    createFinishModal(nextBtn);
    createFinishModal(skipBtn); //? ===> не работает
    // startModal();
  }

  appImage.innerHTML = `<img src="./images/${currentExercises[index].image}.gif" alt="s${currentExercises[index].name}">`;
  appTitle.innerHTML = currentExercises[index].name;
  reps.innerHTML = currentExercises[index].reps;
  allCurrentIndex.forEach((currentIndex) => {
    currentIndex.innerHTML = index + 1;
  });
  allFinishIndex.forEach((finishIndex) => {
    finishIndex.innerHTML = finish + 1;
  });
}

function endExercise() {
  renderFinishInfo();
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

nextBtn.addEventListener("click", () => {
  if (index < finish) {
    currentExercises[index].isFinished = true;
    data.finishReps += currentExercises[index].reps;

    index++;
    showExercise();
    startRestTimer();
    showRestContent();
  } else {
    currentExercises[index].isFinished = true;
    data.finishReps += currentExercises[index].reps;

    endExercise();
  }

  // запуск таймера если стоит на паузе
  if (isPaused === true) {
    isPaused = false;
    pauseBtn.innerHTML = render.pauseBtn;
  }
});

// вычитание повторений
minusBtn.addEventListener("click", () => {
  if (currentExercises[index].reps > 0) {
    currentExercises[index].reps--;
    reps.innerHTML = currentExercises[index].reps;
  }
});

// добавление повторений
plusBtn.addEventListener("click", () => {
  currentExercises[index].reps++;
  reps.innerHTML = currentExercises[index].reps;
});

// пропуск упражнения
skipBtn.addEventListener("click", () => {
  if (index < finish) {
    currentExercises[index].isFinished = false;
    index++;
    showExercise();
    showRestContent();
  } else {
    endExercise();
    //  renderFinishInfo();
  }

  // запуск таймера если стоит на паузе
  if (isPaused === true) {
    isPaused = false;
    pauseBtn.innerHTML = render.pauseBtn;
  }
});

// вернуть прошлое упражнение
prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    showExercise();
  }
  // запуск таймера если стоит на паузе
  if (isPaused === true) {
    isPaused = false;
    pauseBtn.innerHTML = render.pauseBtn;
  }
});

// пауза таймера
pauseBtn.addEventListener("click", () => {
  if (!isPaused) {
    isPaused = true;
    pauseBtn.innerHTML = render.playBtn;
  } else {
    isPaused = false;
    pauseBtn.innerHTML = render.pauseBtn;
  }
});

//*=== ОТДЫХ
function getRestData() {
  restSeconds = data.rest;
}
// управление
let restBtnSkip = document.querySelector(".btn__rest");
let restSkipBtnSeconds = restBtnSkip.querySelector(".rest-timer__seconds");
let restAddBtn = document.querySelector(".btn__rest-add");
let restPauseBtn = document.querySelector(".btn__rest-pause");
let restSeconds;
getRestData();
// контент
let restNextName = document.querySelector(".modal-rest__next-name");
let restNextReps = document.querySelector(".modal-rest__next-reps span");
let restNextImage = document.querySelector(".modal-rest__next-image");

let restInterval;
let isRestPaused = false;

function finishRestTimer() {
  restSeconds = data.rest;
  restSkipBtnSeconds.innerHTML = restSeconds;

  // запускаем таймер если он стоит на паузе
  if (isPaused === true) {
    isPaused = false;
    pauseBtn.innerHTML = render.pauseBtn;
  }

  // переводим в выключеное значение таймер отдыха
  if (isRestPaused === true) {
    isRestPaused = false;
    restPauseBtn.innerHTML = "Пауза";
  }

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
  }, 1000);
}

restAddBtn.addEventListener("click", () => {
  restSeconds += 10;
  restSkipBtnSeconds.innerHTML = restSeconds;
});

restPauseBtn.addEventListener("click", () => {
  if (!isRestPaused && !isPaused) {
    isRestPaused = true;
    isPaused = true;
    restPauseBtn.innerHTML = "Продолжить";
  } else {
    isRestPaused = false;
    isPaused = false;
    restPauseBtn.innerHTML = "Пауза";
  }
});

restBtnSkip.addEventListener("click", () => {
  closeModal();
  finishRestTimer();
});

// контент
function showRestContent() {
  restNextName.innerHTML = currentExercises[index].name;
  restNextReps.innerHTML = currentExercises[index].reps;
  restNextImage.innerHTML = `<img src="./images/${currentExercises[index].image}.gif" alt="s${currentExercises[index].name}">`;
}

//* INFO
let allInfoBtn = document.querySelectorAll(".btn__info");
// контент
let infoImage = document.querySelector(".modal-info__image");
let infoName = document.querySelector(".modal-info__name");
let infoText = document.querySelector(".modal-info__text");

function showExerciseInfo() {
  infoName.innerHTML = currentExercises[index].name;
  infoText.innerHTML = currentExercises[index].info;
  infoImage.innerHTML = `<img src="./images/${currentExercises[index].image}.gif" alt="s${currentExercises[index].name}">`;
}

allInfoBtn.forEach((infoBtn) => {
  infoBtn.addEventListener("click", () => {
    infoName.innerHTML = currentExercises[index].name;
    infoText.innerHTML = currentExercises[index].info;
    infoImage.innerHTML = `<img src="./images/${currentExercises[index].image}.gif" alt="s${currentExercises[index].name}">`;
  });
});

//* FINISH
function createFinishModal(btn) {
  btn.setAttribute("data-modal-href", "finish");
  startModal();
}

let finishTable = document.querySelector(".modal-finish__table");
let finishTimer = document.querySelector(".finish-stats__time");
let finishCcal = document.querySelector(".finish-stats__ccal span");
let finishReps = document.querySelector(".finish-stats__reps span");

function renderFinishInfo() {
  let currentTimer = document.querySelector(".timer").innerHTML;
  let currentCcal =
    convertToMinutes(deleteHtmlTags(currentTimer)) * data.ccalBurned;
  currentCcal += (currentCcal * data.percentBurned.cardio) / 100;

  // статистические данные
  finishCcal.innerHTML = currentCcal;
  finishTimer.innerHTML = currentTimer;
  finishReps.innerHTML = `${data.finishReps} из ${data.allReps}`;

  // таблица тренировки
  for (let i = 0; i < currentExercises.length; i++) {
    finishTable.innerHTML += `<tr class="${currentExercises[i].isFinished}">
		<td class="finish-table__image"><img src="./images/${
      currentExercises[i].image
    }.gif" alt="s${currentExercises[i].name}"></td>
		<td class="finish-table__text">
			<p class="finish-table__name">${currentExercises[i].name}</p>
			<p class="finish-table__reps">${currentExercises[i].reps}</p>
		</td>
		<td class="finish-table__check">${
      render.checkbox[currentExercises[i].isFinished]
    }</td>
	</tr>`;
  }
}

//* INITIALIZE FUNCTIONS
let allInputNumbers = document.querySelectorAll("[data-number-control]");

createNumberControl(allInputNumbers);

function setCurrentReps() {
  let allRepsInput = document.querySelectorAll(".start-table__reps-input");
  let allRepsBtn = document.querySelectorAll("table .number-control-box__btn");

  allRepsInput.forEach((repsInput) => {
    let inputParentName =
      repsInput.parentElement.parentElement.parentElement.parentElement.querySelector(
        ".start-table__name"
      ).innerHTML;

    repsInput.addEventListener("change", () => {
      exercises["Кардио без прыжков"].forEach((exercise) => {
        if (exercise.name === inputParentName) {
          exercise.reps = parseInt(repsInput.value);
        }
      });

      calculateStartStats();
    });

    allRepsBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        exercises["Кардио без прыжков"].forEach((exercise) => {
          if (exercise.name === inputParentName) {
            exercise.reps = parseInt(repsInput.value);
          }
        });

        calculateStartStats();
      });
    });
  });
}

setCurrentReps();

function setRestTime() {
  let restInput = document.querySelector("#rest-time");
  let allRestBtn = document.querySelectorAll(
    ".settings-form__field .number-control-box__btn"
  );

  restInput.addEventListener("change", () => {
    data.rest = parseInt(restInput.value);

    calculateStartStats();
  });

  allRestBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      data.rest = parseInt(restInput.value);

      calculateStartStats();
    });
  });
}
setRestTime();

function updateData() {
  currentExercises = [];
  exercises["Кардио без прыжков"].forEach((exercise) => {
    if (exercise.willDo) {
      currentExercises.push(exercise);
    }
  });
  getRestData();
}

let allStartBtn = document.querySelectorAll(".start-main__btn");

allStartBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeModal();
    updateData();
    startExercise();
  });
});

