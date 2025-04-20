const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score"); // 점수를 표시할 엘리먼트
const gameOverScreen = document.getElementById("gameOverScreen"); // 게임 오버 화면
let isJumping = false;
let jumpSpeed = 0;
let position = 0;
let score = 0; // 점수 변수
let gameOver = false; // 게임 오버 상태

// 점프 함수
function jump() {
  if (isJumping || gameOver) return;
  isJumping = true;
  jumpSpeed = 15;
}

// 키 이벤트 처리
document.addEventListener("keydown", (e) => {
  if (gameOver) {
    // 게임 오버 시 다시 시작
    if (e.code === "Space" || e.code === "ArrowUp") {
      restartGame();
    }
  } else {
    if (e.code === "Space" || e.code === "ArrowUp") {
      e.preventDefault();
      jump();
    }
  }
});

// 게임 루프
function gameLoop() {
  // 점프 물리 적용
  if (isJumping || position > 0) {
    position += jumpSpeed;
    jumpSpeed -= 1;
    if (position <= 0) {
      position = 0;
      isJumping = false;
    }
    dino.style.bottom = position + "px";
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();

// 장애물 움직임
function moveCactus() {
  let cactusLeft = window.innerWidth; // 화면 오른쪽 끝에서 시작
  cactus.style.left = cactusLeft + "px";
  const timer = setInterval(() => {
    if (gameOver) {
      clearInterval(timer);
    }

    if (cactusLeft < -30) {
      cactusLeft = window.innerWidth; // 화면 오른쪽 끝으로 돌아옴
    } else {
      cactusLeft -= 10;
      cactus.style.left = cactusLeft + "px";
    }

    // 공룡과 선인장의 충돌 판정
    const dinoLeft = parseInt(
      window.getComputedStyle(dino).getPropertyValue("left")
    );
    const cactusLeftPos = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );

    // 공룡의 앞부분이 선인장과 충돌한 경우
    if (
      cactusLeftPos > dinoLeft + 50 &&
      cactusLeftPos < dinoLeft + 80 &&
      !isJumping
    ) {
      gameOver = true;
      gameOverScreen.style.display = "block"; // 게임 오버 화면 표시
    }
  }, 30);
}

moveCactus();

// 점수 증가 함수 (1초마다 점수 증가)
setInterval(() => {
  if (!gameOver) {
    score += 10; // 점수 더하기
    scoreDisplay.textContent = `Score: ${score}`;
  }
}, 1000); // 1초마다 점수 증가

// 게임을 다시 시작하는 함수
function restartGame() {
  location.reload(); // 페이지 새로고침
}
