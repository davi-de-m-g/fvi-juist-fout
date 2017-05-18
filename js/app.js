$(document).ready(function() {
    cycleTestimonials(1,0);
    $('#start-btn').click(function() {   
        replaceHeading();
        $('#start').fadeOut(500, function() {
            newGame();
            findQuestion();
            loadQuestion();
            $('#quiz').fadeIn(500);
        });
        $('#testimonials').fadeOut(500);
        $('.disclaim').fadeOut(500);
    });
    $('#answer-btn').click(function() {
        var user_answer = $('input:radio[name=ans]:checked').val();
        if (!user_answer) {
            alert('Maak aub een keuze!');
        } else {
            if (correct(user_answer)) {
                $('#quiz').fadeOut(500, function() {
                    score++;
                    updateScore();
                    $('.answer-exp').text(quiz_questions[num]["answer-exp"]);
                    $('#correct').fadeIn(500);    
                });
            } else {
                $('#quiz').fadeOut(500, function() {
                    $('.answer-exp').text(quiz_questions[num]["answer-exp"]);
                    $('#wrong').fadeIn(500);
                });
            }
        }
    });
    $('.cont-btn').click(function() {       
        $('#correct').fadeOut(500, function() {
            $('#wrong').fadeOut(500, function() {
                if (count >= count_limit) {
                    updateScore();
                    updateRank();
                    $('#final').fadeIn(500);
                } else {
                    findQuestion();
                    loadQuestion();
                    $('form input').prop('checked', false);
                    $('#quiz').fadeIn(500);
                }
            });
        });
    });
    $('#start-over').click(function() {       
        $('#final').fadeOut(500, function() {
            newGame();
            findQuestion();
            loadQuestion();
            $('form input').prop('checked', false);
            $('#quiz').fadeIn(500);    
        });
    });
});

var num = 0;
var count = 0;
var count_limit = 10;
var score = 0;
var prior_questions = [];

var replaceHeading = function() {
    var head = $("<span>De fundamenten van de informatica quiz</span>");
    $('h1').find("span").remove();
    $('h1').append(head);
};
var cycleTestimonials = function(index,prev) {
    $('#testimonials').children('p:eq(' + prev + ')').delay(1800).fadeOut(800, function(){
        $('#testimonials').children('p:eq(' + index + ')').fadeIn(800, function(){
            prev = index;
            if (index === 3){
                index = 0;
            } else {
                index++;
            }
            cycleTestimonials(index,prev);
        });
    });
};
var newGame = function() {
    num = 0;
    count = 0;
    score = 0;
    prior_questions = [];
};
var findQuestion = function() {
    pickQuestion();
    while (wasAsked()) {
        pickQuestion();
    }
};
var pickQuestion = function() {
    var limit = Object.keys(quiz_questions).length;
    num = Math.floor((Math.random() * limit) + 1)
};
var wasAsked = function() {
    var result = false;
    for (var i=0;i<=prior_questions.length;i++){
        if (num == prior_questions[i]) {
            result = true;
        }
    }
    return result;
};
var loadQuestion = function() {
    prior_questions.push(num);    
    $('#icon').html("<i class=\"fa fa-"+quiz_questions[num]["icon"]+"\"></i>");
    $('#text').html(quiz_questions[num]["question"]);
    $('#option-1').html(quiz_questions[num]["options"][1]);
    $('#option-2').html(quiz_questions[num]["options"][2]);
    $('#option-3').html(quiz_questions[num]["options"][3]);
    $('#option-4').html(quiz_questions[num]["options"][4]);
    $('#option-5').html(quiz_questions[num]["options"][5]);
    updateScore();
    count++;
    $('.progress').text(count+"/"+count_limit);
};
var correct = function(user_answer) {
    if (user_answer == quiz_questions[num]["answer"]) {
        return true;
    } else {
        return false;
    }
};
var updateScore = function() {
    $('.score').text(score);
};
var updateRank = function() {
    if (score == 10){
        $('.rank').text('FUNDAMEISTER!');
        $('.rank-msg').text('Prefect score!)');
    } else if (score >= 7 && score <=  9) {
        $('.rank').text('Funda Lord');
        $('.rank-msg').text('You have mad fundamenten skillz!');
    } else if (score >= 4 && score <= 6) {
        $('.rank').text('Fundapprentice');
        $('.rank-msg').text('You may not be the best, but your not the worst.');
    } else if (score >= 1 && score <= 3) {
        $('.rank').text('Fundameh..');
        $('.rank-msg').text('Meh. Not a great score.');
    } else if (score == 0) {
        $('.rank').text('Fundamenteel slecht.');
        $('.rank-msg').text('Sucker!');
    }
};
var quiz_questions = {
    1: {
        "icon": "book",
        "question": "Een string heeft steeds een eindige lengte.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-exp": "Een string over een alfabet ∑ is een eindige rij symbolen. {def 4.2}"
    },
    2: {
        "icon": "book",
        "question": "Een taal bevat steeds een eindig aantal strings.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "Een taal is een verzameling over een alfabet ∑. (def 4.3) .De aantal combinaties hierbij zijn eindeloos."
    },
    3: {
        "icon": "book",
        "question": "De verzameling van alle strings die gevormd kunnen worden met bepaald alfabet, is een taal over dat alfabet.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-exp": "Een taal is een verzameling over een alfabet ∑. (def 4.3) (~Een taal over ∑is een deelverzameling van ∑* ."
    },
    4: {
        "icon": "book",
        "question": "Voor eender welke twee talen S en T, regulier of niet, is TS^*T een reguliere taal.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "We nemen als voorbeeld; alle zinnen in het Nederlands en alle zinnen in Frans. Beide talen zijn niet regulier. NF^*N gaat evenzeer niet regulier zijn. "
    },
    5: {
        "icon": "book",
        "question": "{a}* bevat oneindig veel strings.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-exp": "De asterix geeft aan dat er oneindig vaak een element (a) mag toegevoegd worden aan een string. Dit geeft oneindig veel mogelijkheden en dus oneindig veel strings."
    },
    6: {
        "icon": "book",
        "question": "Niet-deterministische automaten kunnen meer talen herkennen dan deterministische.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "Voor elke niet-determinische eindige automaat bestaat er een deterministische automaat die dezelfde taal herkent. (stelling 4.4)"        
    },
    7: {
        "icon": "book",
        "question": "Niet-deterministische eindige automaten kunnen dezelfde talen herkennen als deterministische, maar soms efficiënter in tijd (d.w.z. strings worden soms herkend met minder toestandstransities).",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "Voor elke niet-determinische eindige automaat bestaat er een deterministische automaat die dezelfde taal herkent. (stelling 4.4) Verder zijn niet-deterministische automaten vaak veel eenvoudiger om te ontwikkelen. Elke deterministische eindige automaat kan aanzien worden als een niet-deterministische automaat. Efficiëntie is in dit geval duidelijk steeds gelijk."
    },
    8: {
        "icon": "book",
        "question": "Niet-deterministische turingmachines kunnen meer talen herkennen dan deterministische.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "Alles wat kan gedaan worden met een NDTM, kan ook gedaan worden met een DTM (en vice versa). Het Haltin probleem is bijvoorbeeld niet oplosbaar door beide. MAAR; NPC problemen kunnen polynomiaal opgelost worden door NDTM en voor DTM weet men niet hoe dit polynomiaal kan oplossen. "
    },
    9: {
        "icon": "book",
        "question": "Als L ∝ T en L is een element van de klasse P, dan geldt steeds T is een element van P.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "Indien L1∝ L2 en L2 Є P dan is ook L1 Є P (stelling 4.8). Deze relatie werkt maar in één richting, niet vice versa. Indien L ~ T (dus L ∝ T en  T ∝ L), dan had dit wel waar geweest."
    },
    10: {
        "icon": "book",
        "question": "We weten zeker dat P een deelverzameling is van NP en dat NP een deelverzameling is van NPC.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "P en NPC zijn beide deelverzamelingen van NP. Een taal L is NP-compleet als en slechts als L Є NP en voor elke andere taal L’ Є NP geldt dat L’∝ L. (def 4.32)"
    },
    11: {
        "icon": "book",
        "question": "We weten zeker dat P een deelverzameling is van NPC en dat NPC een deelverzameling is van NP. ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "P en NPC zijn beide deelverzamelingen van NP. Een taal L is NP-compleet als en slechts als L Є NP en voor elke andere taal L’ Є NP geldt dat L’∝ L. (def 4.32)"
    },
    12: {
        "icon": "book",
        "question": "Elke vlakke graaf voldoet aan v - e + f = 2 met v het aantal knopen, e het aantal bogen en f het aantal zijvlakken.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "Een samenhangde vlakke graaf voldoet aan deze formule. Zie formule van Euler (stelling 5.14)"
    },
    13: {
        "icon": "book",
        "question": "In een samenhangende graaf bestaat er een pad tussen elke twee knopen.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-exp": "Een graaf is samenhangend als en slechts als tussen elke twee knopen van de graaf een pad bestaat (def 5.10)"
    },
    14: {
        "icon": "book",
        "question": "K2,2 is homeomorf met K3.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-exp": "Door een knoop van graad 2 van K2,2 te verwijderen en te vervangen door één boog bekom je K3. \n Een graaf G(V,E) is homeomorf als en slechts als G’ uit G bekomen kan worden door een of meer keren een knoop v van graad 2 te kiezen, die samen met zijn invallende bogen (v,w) en (v,u) te verwijderen, en boog (u,w) toe te voegen. (def 5.24)"
    },
    15: {
        "icon": "book",
        "question": "Als twee grafen isomorf zijn, hebben ze evenveel knopen.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-exp": "Het hebben van hetzelfe aantal knopen is één van de eigenschappen van isomorfisme.(Zie def 5.21)"
    },
    16: {
        "icon": "book",
        "question": "Als twee grafen homeomorf zijn, hebben ze evenveel bogen.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "Vanzelfsprekend. \n Een graaf G(V,E) is homeomorf als en slechts als G’ uit G bekomen kan worden door een of meer keren een knoop v van graad 2 te kiezen, die samen met zijn invallende bogen (v,w) en (v,u) te verwijderen, en boog (u,w) toe te voegen. (def 5.24)"
    },
    17: {
        "icon": "book",
        "question": "Bepalen of een gewogen graaf een Hamiltoniaanse kring met gewicht kleiner dan 100 heeft is zeker in P.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "To be added"
    },
    18: {
        "icon": "book",
        "question": "Bepalen of een graaf een Eureliaanse kring heeft, is zeker in NP.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-exp": "To be added"
    },
    19: {
        "icon": "book",
        "question": "Bepalen of het korste pad tussen twee gegeven knopen in een gewogen graaf en een gewicht kleiner dan 100, is zeker NP-compleet.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "To be added"

    },
    20: {
        "icon": "book",
        "question": "Een boom met n knopen heeft steeds n-1 bogen.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-exp": "To be added"

    }
};

/*



*/






