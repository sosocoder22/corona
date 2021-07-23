class Game {
  constructor() {}

  getState() {
    database.ref("gameState").on("value", (data) => {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({ gameState: state });
  }
  start() {
    if (gameState == 0) {
      player = new Player();
      player.getCount();
      form = new Form();
      form.display();
    }
    road1 = createSprite(width/2, 300, width * 4, 50);
    // road2 = createSprite(width / 2 -100, 650, width, 50);
    road1.addImage(bg);
    // road2.addImage(bg);
    road1.scale = 1.5;
    road1.velocityX = -5;
    // road.scale = 1.3;
    player1 = createSprite(750, 200, 50, 50);
    player2 = createSprite(750, 400, 50, 50);
    virus1 = createSprite(300, 200, 50, 50);
    virus2 = createSprite(300, 400, 50, 50);
    virus1.addImage(virusImg);
    virus2.addImage(virusImg);
    players = [player1, player2];
    player1.addAnimation("label1", player1Animated);
    player2.addAnimation("label2", player2Animated);
    fakeNews1 = createSprite(2300, 100, 10, 10);
    fakeNews2 = createSprite(2300, 150, 10, 10);
    fakeNews3 = createSprite(2300, 200, 10, 10);
    fakeNews2.visible = false;
    fakeNews3.visible = false;
    fakeNews1.visible = false;
    vaccine1 = createSprite(2300, 300, 10, 10);
    vaccine2 = createSprite(2300, 400, 10, 10);
    vaccine1.visible = false;
    vaccine2.visible = false;
    fakeNews1.addImage(fakeNewsImg1);
    fakeNews1.scale = 0.125;
    fakeNews2.addImage(fakeNewsImg2);
    fakeNews2.scale = 0.5;
    fakeNews3.addImage(fakeNewsImg3);
    fakeNews3.scale = 0.125;
    vaccine1.addImage(vaccineImg1);
    vaccine1.scale = 0.5;
    vaccine2.addImage(vaccineImg2);
    vaccine2.scale = 0.5;
    // fakeNews3.addImage(fakeNewsImg3);
    // fakeNews3.scale = 0.125;
  }
  play() {
    
    form.hide();
    player.getPlayerInfo();
    fakeNews2.visible = true;
    fakeNews3.visible = true;
    fakeNews1.visible = true;
    vaccine1.visible = true;
    vaccine2.visible = true;

    database.ref("/fakenews1").on("value", (value) => {
      fakeNews1.y = value.val().y;
    });

    database.ref("/fakenews2").on("value", (value) => {
      fakeNews2.y = value.val().y;
    });
    database.ref("/fakenews3").on("value", (value) => {
      fakeNews3.y = value.val().y;
    });
    database.ref("/vaccine1").on("value", (value) => {
      vaccine1.y = value.val().y;
    });
    database.ref("/vaccine2").on("value", (value) => {
      vaccine2.y = value.val().y;
    });
    database.ref("/coronavirus1").on("value", (value) => {
      virus1.x = value.val().x;
      virus1.y = value.val().y;
    });
    database.ref("/coronavirus2").on("value", (value) => {
      virus2.x = value.val().x;
      virus2.y = value.val().y;
    });

    // database.ref("/fakenews2").on((value) => {
    //   fakeNews2.y = value.val().y;
    // });
    // database.ref("/fakenews3").on((value) => {
    //   fakeNews3.y = value.val().y;
    // });
    // player1.velocityX = 2
    var index = 0;
    // console.log(road1.x);

    if (allPlayers != null) {
      background("grey")
      for (var i in allPlayers) {
        index += 1;

        if ("player" + player.index === i) {
          player.y = players[index - 1].y;
          if (player.index == 1) {
            virus1.y = player.y;
          } else {
            virus2.y = player.y;
          }

          // camera.position.y = height / 2;
          player.update();
          // camera.position.x = players[player.index-1].x;
        } else {
          players[index - 1].y = allPlayers[i].y;
          if (player.index == 1) {
            virus2.y = players[index - 1].y;
          } else {
            virus1.y = players[index - 1].y;
          }
        }
      }

      // road1.x = players[0].x - 100
    }
    if (frameCount % 200 == 0) {
      randomY1 = Math.round(random(100, 600));

      player.updateFakeNews1(2300, randomY1);
      fakeNews1.velocityX = -10;
      fakeNews1.lifetime = 600;
    }
    if (fakeNews1.x < 0) {
      fakeNews1.x = 2300;
         fakeNews1.velocityX = 0;
    }

    if (frameCount % 800 == 0) {
      randomY4 = Math.round(random(100, 600));

      player.updateVaccine1(2300, randomY4);
      vaccine1.velocityX = -10;
      vaccine1.lifetime = 600;
    }
    if (vaccine1.x < 0) {
      vaccine1.x = 2300;
      vaccine1.velocityX = 0;
    }

    if (frameCount % 1000 == 0) {
      randomY5 = Math.round(random(100, 600));

      player.updateVaccine2(2300, randomY5);
      vaccine2.velocityX = -10;
      vaccine2.lifetime = 600;
    }
    if (vaccine2.x < 0) {
      vaccine2.x = 2300;
      vaccine2.velocityX = 0;
    }

    if (frameCount % 350 == 0) {
      randomY2 = Math.round(random(300, 800));

      player.updateFakeNews2(2300, randomY2);
      fakeNews2.velocityX = -5;
      fakeNews2.lifetime = 600;
    }
    if (fakeNews2.x < 0) {
      fakeNews2.x = 2300;
          fakeNews2.velocityX = 0;
    }
    if (frameCount % 550 == 0) {
      randomY3 = Math.round(random(500, 900));

      player.updateFakeNews3(2300, randomY3);
      fakeNews3.velocityX = -7;
      fakeNews3.lifetime = 600;
    }
    if (fakeNews3.x < 0) {
      fakeNews3.x = 2300;
          fakeNews3.velocityX = 0;
    }
    if (road1.x < width/2-200) {
      road1.x = width / 2;
    }

    //vaccine
    if (vaccine1.isTouching(player1)) {
      isImmune = true;
      vaccine1.x = 2300;
      randomY4 = Math.round(random(100, 600));
      player.updateVaccine1(2300, randomY4);
    }
    if (vaccine2.isTouching(player1)) {
      isImmune = true;
      vaccine2.x = 2300;
      randomY5 = Math.round(random(300, 800));
      player.updateVaccine2(2300, randomY5);
    }

    if (vaccine1.isTouching(player2)) {
      vaccine1.x = 2300;
      randomY4 = Math.round(random(100, 600));
      player.updateVaccine1(2300, randomY4);
    }
    if (vaccine2.isTouching(player2)) {
      vaccine2.x = 2300;
      randomY5 = Math.round(random(300, 800));
      player.updateVaccine2(2300, randomY5);
    }
    if (player.index == 1) {
      if (fakeNews1.isTouching(player1)) {
        if (isImmune == false) {
          fakeNews1.x = 2300;
          randomY1 = Math.round(random(100, 600));
          player.updateFakeNews1(2300, randomY1);
          player.lives -= 1;
          player.updateLives();
          virus1.x += 100;
          player.updateVirus1(virus1.x, virus1.y);
        } else {
          fakeNews1.x = 2300;
          randomY1 = Math.round(random(100, 600));
          player.updateFakeNews1(2300, randomY1);
          isImmune = false;
        }
      }
      if (fakeNews2.isTouching(player1)) {
        if (isImmune == false) {
          fakeNews2.x = 2300;
          randomY2 = Math.round(random(300, 800));
          player.updateFakeNews2(2300, randomY2);
          player.lives -= 1;
          player.updateLives();
          virus1.x += 100;
          player.updateVirus1(virus1.x, virus1.y);
        } else {
          fakeNews2.x = 2300;
          randomY2 = Math.round(random(300, 800));
          player.updateFakeNews2(2300, randomY2);
          isImmune = false;
        }
      }

      if (fakeNews3.isTouching(player1)) {
        if (isImmune == false) {
          fakeNews3.x = 2300;
          randomY3 = Math.round(random(500, 900));
          player.updateFakeNews3(2300, randomY3);
          player.lives -= 1;
          player.updateLives();
          virus1.x += 100;
          player.updateVirus1(virus1.x, virus1.y);
        } else {
          fakeNews3.x = 2300;
          randomY3 = Math.round(random(500, 900));
          player.updateFakeNews3(2300, randomY3);
          isImmune = false;
        }
      }
      if (fakeNews1.isTouching(player2)) {
        fakeNews1.x = 2300;
        randomY1 = Math.round(random(100, 600));
        player.updateFakeNews1(2300, randomY1);
      }
      if (fakeNews2.isTouching(player2)) {
        fakeNews2.x = 2300;
        randomY2 = Math.round(random(300, 800));
        player.updateFakeNews2(2300, randomY2);
      }
      if (fakeNews3.isTouching(player2)) {
        fakeNews3.x = 2300;
        randomY3 = Math.round(random(500, 900));
        player.updateFakeNews3(2300, randomY3);
      }
    }
    if (player.index == 2) {
      if (fakeNews1.isTouching(player2)) {
        if (isImmune == false) {
          fakeNews1.x = 2300;
          randomY1 = Math.round(random(100, 600));
          player.updateFakeNews1(2300, randomY1);
          player.lives -= 1;
          player.updateLives();
          virus2.x += 100;
          player.updateVirus2(virus2.x, virus2.y);
        } else {
          fakeNews1.x = 2300;
          randomY1 = Math.round(random(100, 600));
          player.updateFakeNews1(2300, randomY1);
          isImmune = false;
        }
      }
      if (fakeNews2.isTouching(player2)) {
        if (isImmune == false) {
          fakeNews2.x = 2300;
          randomY2 = Math.round(random(300, 800));
          player.updateFakeNews2(2300, randomY2);
          player.lives -= 1;
          player.updateLives();
          virus2.x += 100;
          player.updateVirus2(virus2.x, virus2.y);
        } else {
          fakeNews2.x = 2300;
          randomY2 = Math.round(random(300, 800));
          player.updateFakeNews2(2300, randomY2);
          isImmune = false;
        }
      }

      if (fakeNews3.isTouching(player2)) {
        if (isImmune == false) {
          fakeNews3.x = 2300;
          randomY3 = Math.round(random(500, 900));
          player.updateFakeNews3(2300, randomY3);
          player.lives -= 1;
          player.updateLives();
          virus2.x += 100;
          player.updateVirus2(virus2.x, virus2.y);
        } else {
          fakeNews3.x = 2300;
          randomY3 = Math.round(random(500, 900));
          player.updateFakeNews3(2300, randomY3);
          isImmune = false;
        }
      }
      if (fakeNews1.isTouching(player1)) {
        fakeNews1.x = 2300;
        randomY1 = Math.round(random(100, 600));
        player.updateFakeNews1(2300, randomY1);
      }
      if (fakeNews2.isTouching(player1)) {
        fakeNews2.x = 2300;
        randomY2 = Math.round(random(300, 800));
        player.updateFakeNews2(2300, randomY2);
      }
      if (fakeNews3.isTouching(player1)) {
        fakeNews3.x = 2300;
        randomY3 = Math.round(random(500, 900));
        player.updateFakeNews3(2300, randomY3);
      }
    }

    if (keyIsDown(DOWN_ARROW)) {
      players[player.index - 1].velocityY = 5.5;
    }
    if (keyIsDown(UP_ARROW)) {
      players[player.index - 1].velocityY = -5.5;
    }
    if (player1.y > height || player1.y < 0) {
      player1.velocityY =player1.velocityY-player1.velocityY
    }
    if (player2.y > height || player2.y < 0) {
      player2.velocityY = player1.velocityY-player1.velocityY
    }

    drawSprites();
    fill("white");
    textSize(25);
    text("Immune to VIRUS: " + isImmune, 50, 50);
    text("Lives: " + player.lives, 550, 50);
  }

  end() {
    form.hide();
    console.log(gameState);
    var rank = createElement("h1");
    rank.html("Game Over: Your rank was " + player.rank);
    rank.position(width / 2 - 100, height / 2);
  }
  // updateVaccine(x, y) {
  //   database.ref("/vaccine").update({ x: x, y: y });
  // }

  // readVaccine() {
  //   database.ref("/vaccine").on((value) => {
  //     return value.val();
  //   });
  // }

  // updateVirus(x, y) {
  //   database.ref("/virus").update({ x: x, y: y });
  // }
  // readVirus() {
  //   database.ref("/virus").on((value) => {
  //     return value.val();
  //   });
  // }

  updateWaves(wave) {
    database.ref("/").update({ waves: wave });
  }
  readWaves() {
    database.ref("/waves").on((value) => {
      return value.val();
    });
  }
}
