// Menu
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Checklist
const checkboxes = document.querySelectorAll(".safety-check");
const checklistStatus = document.getElementById("checklistStatus");

checkboxes.forEach((box) => {
  box.addEventListener("change", () => {
    const total = checkboxes.length;
    const checkedCount = document.querySelectorAll(".safety-check:checked").length;
    checklistStatus.textContent = `Você marcou ${checkedCount} de ${total} proteções`;
  });
});

// Quiz
const quizData = [
  {
    text: '📩 SMS recebido: "CORREIOS: Seu pacote foi taxado e será devolvido hoje. Regularize agora em: http://correios-taxa-entrega.net"',
    isScam: true,
    explanation: "É GOLPE! Os Correios não enviam SMS com links encurtados ou domínios estranhos (.net). O site oficial é sempre correios.com.br."
  },
  {
    text: '💬 WhatsApp de número desconhecido com a foto do seu filho: "Oi mãe/pai, meu celular quebrou, esse é meu número novo. Consegue fazer um PIX de R$ 450 agora? Depois te explico."',
    isScam: true,
    explanation: "É GOLPE! Esse é o clássico golpe do falso parente. Sempre ligue para o número antigo da pessoa antes de transferir dinheiro."
  },
  {
    text: '🏦 Você abriu diretamente o aplicativo oficial do seu banco no celular e viu uma notificação interna pedindo para atualizar seu cadastro.',
    isScam: false,
    explanation: "SEGURO! Avisos exibidos dentro do próprio aplicativo oficial do banco (sem clicar em links externos de SMS ou e-mail) são confiáveis."
  },
  {
    text: '📞 Ligação telefônica: "Aqui é da central de segurança do seu banco. Detectamos uma compra de R$ 2.800. Instale o aplicativo AnyDesk para cancelarmos agora."',
    isScam: true,
    explanation: "É GOLPE! Aplicativos como AnyDesk ou TeamViewer dão controle total do seu celular ao golpista. Bancos nunca pedem isso."
  },
  {
    text: '🛒 Compra online: Na hora de pagar o PIX, você confere na tela do banco e o destinatário aparece exatamente com o CNPJ e Razão Social oficial da loja.',
    isScam: false,
    explanation: "SEGURO! Conferir o CNPJ e o nome da empresa recebedora antes de confirmar a senha do PIX é uma das melhores formas de evitar fraudes."
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;

const scenarioText = document.getElementById("scenarioText");
const quizProgress = document.getElementById("quizProgress");
const quizFeedback = document.getElementById("quizFeedback");
const nextBtn = document.getElementById("nextBtn");
const quizContainer = document.getElementById("quizContainer");
const quizResult = document.getElementById("quizResult");

function loadQuestion() {
  answered = false;
  const item = quizData[currentIndex];
  quizProgress.textContent = `Pergunta ${currentIndex + 1} de ${quizData.length}`;
  scenarioText.textContent = item.text;
  quizFeedback.classList.add("hidden");
  nextBtn.classList.add("hidden");
}

function answerQuiz(userSaysScam) {
  if (answered) return;
  answered = true;

  const item = quizData[currentIndex];
  const isCorrect = userSaysScam === item.isScam;

  if (isCorrect) {
    score++;
    quizFeedback.className = "feedback-box feedback-correct";
    quizFeedback.innerHTML = `<strong>✅ Você acertou!</strong><br>${item.explanation}`;
  } else {
    quizFeedback.className = "feedback-box feedback-wrong";
    quizFeedback.innerHTML = `<strong>❌ Atenção!</strong><br>${item.explanation}`;
  }

  quizFeedback.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  nextBtn.textContent = currentIndex === quizData.length - 1 ? "Ver Resultado Final" : "Próxima Situação →";
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
}

function showFinalResult() {
  quizContainer.classList.add("hidden");
  quizProgress.textContent = "Concluído";
  quizResult.classList.remove("hidden");
  quizResult.innerHTML = `
    <h3>Você acertou ${score} de ${quizData.length} situações!</h3>
    <p style="margin: 0.8rem 0 1.2rem 0; color: #475569;">
      Compartilhe este site com familiares e amigos para ajudar mais pessoas a se protegerem.
    </p>
    <button class="btn btn-primary" onclick="restartQuiz()">Refazer o Teste</button>
  `;
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  quizResult.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  loadQuestion();
}

loadQuestion();

// 4. Testador de Força de Senha
const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");
const strengthBar = document.getElementById("strengthBar");
const strengthLabel = document.getElementById("strengthLabel");

const critLength = document.getElementById("critLength");
const critUpper = document.getElementById("critUpper");
const critNumber = document.getElementById("critNumber");
const critSpecial = document.getElementById("critSpecial");

togglePassword.addEventListener("click", () => {
  const isPass = passwordInput.type === "password";
  passwordInput.type = isPass ? "text" : "password";
  togglePassword.textContent = isPass ? "Ocultar" : "Mostrar";
});

passwordInput.addEventListener("input", () => {
  const val = passwordInput.value;
  let points = 0;

  const hasLength = val.length >= 8;
  const hasStrongLength = val.length >= 12;
  const hasUpperAndLower = /[a-z]/.test(val) && /[A-Z]/.test(val);
  const hasNumber = /[0-9]/.test(val);
  const hasSpecial = /[^A-Za-z0-9]/.test(val);

  updateCriterion(critLength, hasLength, "Pelo menos 8 caracteres (ideal: 12+)");
  updateCriterion(critUpper, hasUpperAndLower, "Letras maiúsculas e minúsculas");
  updateCriterion(critNumber, hasNumber, "Pelo menos um número (0-9)");
  updateCriterion(critSpecial, hasSpecial, "Caractere especial (! @ # $ %)");

  if (hasLength) points += 25;
  if (hasStrongLength) points += 15;
  if (hasUpperAndLower) points += 20;
  if (hasNumber) points += 20;
  if (hasSpecial) points += 20;

  if (val.length === 0) {
    strengthBar.style.width = "0%";
    strengthLabel.textContent = "Força: Aguardando digitação...";
    return;
  }

  strengthBar.style.width = `${points}%`;

  if (points <= 40) {
    strengthBar.style.backgroundColor = "#dc2626";
    strengthLabel.textContent = "Força: Fraca (fácil de descobrir)";
  } else if (points <= 75) {
    strengthBar.style.backgroundColor = "#d97706";
    strengthLabel.textContent = "Força: Média (pode melhorar)";
  } else {
    strengthBar.style.backgroundColor = "#16a34a";
    strengthLabel.textContent = "Força: Forte (ótima proteção!)";
  }
});

function updateCriterion(element, passed, text) {
  element.textContent = `${passed ? "✅" : "❌"} ${text}`;
  element.style.color = passed ? "#16a34a" : "#475569";
}