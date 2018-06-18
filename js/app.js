$(document).ready(function() {
    cycleTestimonials(1,0);
    $('#start-btn').click(function() {   
        replaceHeading();
        $('#start').fadeOut(500, function() {
            count_limit = $("input[name='questions_amount']:checked").val();
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
                    $('#barequestion').fadeIn(500);
                    $('#correct').fadeIn(500);    
                });
            } else {
                $('#quiz').fadeOut(500, function() {
                    $('.answer-exp').text(quiz_questions[num]["answer-exp"]);
                    $('.answer-img').attr("src",quiz_questions[num]["answer-img"]);
                    $('#barequestion').fadeIn(500);
                    $('#wrong').fadeIn(500);
                });
            }
        }
    });
    $('.cont-btn').click(function() {       
        $('#correct').fadeOut(500, function() {
            $('#wrong').fadeOut(500, function() {
                if (count >= count_limit) {
                    updateFinalScore();
                    updateRank();
                    $('#barequestion').fadeOut(500);
                    $('#final').fadeIn(500);
                    
                } else {
                    findQuestion();
                    loadQuestion();
                    $('form input').prop('checked', false);
                    $('#barequestion').fadeOut(0);
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
//var count_limit = 30;
var count_limit = 25;

var score = 0;
var prior_questions = [];

var replaceHeading = function() {
    var head = $("<span>De fundamenten van de informatica quiz</span>");
    $('h1').find("span").remove();
    $('h1').append(head);
};
var cycleTestimonials = function(index,prev) {
    $('#testimonials').children('p:eq(' + prev + ')').delay(4800).fadeOut(800, function(){
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
    $('#textb').html(quiz_questions[num]["question"]);
    $('#option-1').html(quiz_questions[num]["options"][1]);
    $('#option-2').html(quiz_questions[num]["options"][2]);     
    updateScore();
    count++;
    $('.progress').text(count+"/"+count_limit);
};
var correct = function(user_answer) {
    if (user_answer == quiz_questions[num]["answer"] || user_answer == quiz_questions[num]["answer2"] || user_answer == quiz_questions[num]["answer3"] || user_answer == quiz_questions[num]["answer4"]) {
        return true;
    } else {
        return false;
    }
};
var updateScore = function() {
    $('.score').text(score);
};
var updateFinalScore = function() {
    $('.score').text(score+"/"+count_limit);
};
var updateRank = function() {
    if (score == count_limit){
        $('.rank').text('FUNDAMEISTER!');
        $('.rank-msg').text('Perfect score!');
    } else if (score >= count_limit*0.80 && score <=  count_limit-1) {
        $('.rank').text('Funda Lord');
        $('.rank-msg').text('You have mad fundamenten skillz!');
    } else if (score >= count_limit*0.60 && score <= count_limit*0.80) {
        $('.rank').text('Fundapprentice');
        $('.rank-msg').text('You may not be the best, but you are not the worst.');
    } else if (score >= count_limit*0.50 && score <= count_limit*0.60) {
        $('.rank').text('Fundameh..');
        $('.rank-msg').text('Meh. Geslaagd. Maar not a great score.');
    } else if (score < count_limit*0.50) {
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
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
        "answer-img": "",
        "answer-exp": "Het vinden van een Hamiltoniaanse kring vereist backtracking. Dit is een karakteristiek van een NP-compleet probleem."
    },
    18: {
        "icon": "book",
        "question": "Bepalen of een graaf een Eureliaanse kring heeft, is zeker in NP.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Een euleriaanse kring kan men bepalen in polynomiale tijd. Dus wtf?"
    },
    19: {
        "icon": "book",
        "question": "Bepalen of het korste pad tussen twee gegeven knopen in een gewogen graaf en een gewicht kleiner dan 100, is zeker NP-compleet.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Dit is het TSP. Het zoeken van een oplossing ligt in NP en het verifieren van de oplossing gaat ook niet in polynomiale tijd. Dit probleem is dus NP-hard."

    },
    20: {
        "icon": "book",
        "question": "Een boom met n knopen heeft steeds n-1 bogen.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Een boom is een samenhangende graaf met n knopen en n-1 bogen. (Equivalente definitie van een boom)"

    },
    21: {
        "icon": "book",
        "question": "Elke samenhangende graaf heeft precies 1 opspannende boom",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Een samenhangende graaf moet ook kringvrij zijn. (stelling 5.22)"

    },
    22: {
        "icon": "book",
        "question": "Het algoritme van Kruskal en het algoritme van Prim zijn twee verschillende manieren om hetzelfde probleem op te lossen.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Beiden zijn algoritmes voor het vinden van een minimaal opspannende boom in een gewogen graaf."

    },
    23: {
        "icon": "book",
        "question": "Het algoritme van Kruskal en het Algoritme van Prim geven steeds dezelfde uitkomst. ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Prim kiest herhalend een nieuwe edge met het laagst mogelijke gewicht. Indien er nu meerdere zo’n edges bestaan, zijn er ook meerdere oplossingen mogelijk. Prim en Kruskal garanderen enkel dezelfde oplossing indien ieder gewicht in de graaf uniek is."

    },
    24: {
        "icon": "book",
        "question": "Elke boom heeft een twee-kleuring.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Aangezien een boom geen kringen bevat, volstaan 2 kleuren."

    },
    25: {
        "icon": "book",
        "question": "Elke eindige taal is regulier. (= Eindige talen zijn regulier)",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Indien een taal geaccepteerd wordt door een eindige machine, is de taal regulier. Een eindige taal wordt geaccepteerd door een eindige automaat. In andere woorden: voor n geldige strings Ei (1 ≤ i ≤ n): E1|E2|E3|...|En "

    },
    26: {
        "icon": "book",
        "question": "Reguliere talen zijn eindig",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "De verzameling van getallen groter dan 100, is regulier en oneindig. Alsook bv de taal a^* is regulier en oneindig"

    },
    27: {
        "icon": "book",
        "question": "Elke reguliere taal bevat de lege string.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "De verzameling van getallen groter dan 100, is regulier en bevat geen lege string."

    },
    28: {
        "icon": "book",
        "question": "De lege taal is een reguliere taal.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Je kan een determenistische eindige automaat opstellen die de lege string accepteert. Indien een machine geen enkele string accepteert, herkent het nog steeds één taal. Namelijk de lege taal."

    },
    29: {
        "icon": "book",
        "question": "Voor elke reguliere taal L geldt: als x en y een element is van L, dan is xy ook een element van L.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Neem de Nederlandse taal L met alfabet ∑ = {a,b,c,..,z,A,B,C,...,Z} en x = “snot” en y = “vlees”. Dus is xy = “snotvlees” en dit behoort niet tot de taal L."

    },
    30: {
        "icon": "book",
        "question": "Voor elke reguliere taal bestaat er een eindige automaat die die taal herkent.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "De klasse van talen die eindige automaten accepteren reguliere talen, vallen samen."

    },
    31: {
        "icon": "book",
        "question": "De verzameling van {(ab)^n | n element van de natuurlijke getallen} is een reguliere taal.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Iedere verzameling die als reguliere expressie te schrijven valt, is tevens ook een reguliere taal. In dit geval (ab)*"

    },
    32: {
        "icon": "book",
        "question": "De verzameling van {a^m b^n | n,m element van de natuurlijke getallen} is een reguliere taal.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Iedere verzameling die als reguliere expressie te schrijven valt, is tevens ook een reguliere taal. In dit geval (a*b*)"

    },
    33: {
        "icon": "book",
        "question": "De verzameling van {a^n b^n | n element van de natuurlijke getallen} is een reguliere taal.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Geen enkel natuurlijk getal in oneindig, maar er zijn oneindig veel natuurlijke getallen. Dus voor iedere n kan je een eindige automaat maken die a^n b^n herkent, maar je kan er geen één enkele construeren voor alle mogelijke n.                                           Dit kan bewezen worden adhv de Pompstelling (stelling 4.3)                                       Bewijs: Stel dat L regulier is. Dan bestaat er volgens de pompstelling een getal k zodat |s| ≥ k en kan elke string bestaan uit s = xyz met |xy| ≤ k en |y| > 0                                                                            Stel s = aaabbb en k = 5                                       s = aa a bbb met |xy| ≤ 5 en y = bbb.                                       Een eindige automaat die s accepteert, moet xy²z ook accepteren.In dat geval bevat de string meer a's dan b's en is de taal niet correct. Contradictie."
    },
    34: {
        "icon": "book",
        "question": "De verzameling van alle wiskundige uitdrukkingen gevormd met +,-,/,x en haakjes is een reguliere taal. ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Geen enkel natuurlijk getal in oneindig, maar er zijn oneindig veel natuurlijke getallen en wiskundige uitdrukkingen. Dus voor iedere uitdrukking kan je een eindige automaat maken die een bepaalde wiskunde uitdrukking herkent, maar je kan er geen één enkele construeren voor alle mogelijke combinaties."

    },
    35: {
        "icon": "book",
        "question": "De klasse van talen herkend door eindige toestandsautomaten is dezelfde als de klasse herkend door niet-determinitische eindige automaten.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "De klasse van talen die herkend worden door een eindige automaat valt precies samen met de klasse van de reguliere talen (stelling 4.2)"

    },
    36: {
        "icon": "book",
        "question": "Voor elk java-programma bestaat er een Turningmachine die voor eender welke input dezelfde output geeft als dat programma.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Java is turing compleet. Dit wil zeggen dat het een systeem is waarin een programma geschreven kan worden dat een antwoord kan vinden op iedere gegevensbewerking. In principe betekent dit dat java gebruikt kan worden voor eender werk berekenbaar probleem. "

    },
    37: {
        "icon": "book",
        "question": "Voor elke binaire booleaanse operator f: BxB ->, met B = {0,1} bestaat er een eindige automaat die f berekent.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Iedere staat van een eindige automaat is op zichzelf een booleaanse operator, die voor een bepaalde input een bepaalde output geeft. "

    },
    38: {
        "icon": "book",
        "question": "Voor elke functie f: N -> N bestaat er een eindige automaat die f berekent.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Een turing machine is in principe een eindige automaat.Er bestaat een functie f: N->N die niet Turing-berekenbaar is. (stelling 4.6)"

    },
    39: {
        "icon": "book",
        "question": "Voor elke functie f: N -> N bestaat er een TM die f berekent.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Er bestaat een functie f: N->N die niet Turing-berekenbaar is. (stelling 4.6)"

    },
    40: {
        "icon": "book",
        "question": "Uit de stelling van Cook volgt SAT is een element van NPC.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "SAT is NP-Compleet (stelling 4.10)"

    },
    41: {
        "icon": "book",
        "question": "Uit de stelling van Cook volgt SAT is geen element van NPC.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "De stelling van Cook zegt dat SAT een NP-Compleet probleem is en niets meer. Verder heeft men nog niet kunnen bewijzen dat een probleem in NP ook in P kan zitten. Een van de zeven 'millennium problems' – wiskundige vraagstukken waarmee een miljoen dollar verdiend kan worden – is het 'P versus NP probleem'. "

    },
    42: {
        "icon": "book",
        "question": "Het algoritme van Dijkstra heeft complexiteit O(n^3) (met n het aantal knopen)",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "O(n^3) is inderdaad een bovengrens voor de effectieve complexiteit O(n²). Het algoritme kan zelfs uitgevoerd worden in tijd O(|V| log|V|+|E|)."

    },
    43: {
        "icon": "book",
        "question": "Het algoritme van Dijkstra is assymptotisch equivalent met n^3. (met n het aantal knopen) ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Assymptotisch is Dijkstra eerder equivalent met n². "

    },
    44: {
        "icon": "book",
        "question": "Het algoritme van Dijkstra kan door een deterministische TM uitgevoerd worden",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Een functie is effectief berekenbaar als en slechts als die Turing-berekenbaar is. (stelling 4.5 These van Church)"

    },
    45: {
        "icon": "book",
        "question": "Een graaf met een euleriaanse kring heeft nooit knopen met oneven graad. ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Een graaf G heeft een Euleriaanse kring als en slechts als de graaf samenhangend is en elke knoop een even graad heeft. (stelling 5.4)"

    },
    46: {
        "icon": "book",
        "question": "Elke samenhangende vlakke graaf heeft een Euleriaanse kring.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Een samenhangende vlakke graaf kan knopen bevatten met een oneven graad. En een graaf G heeft een Euleriaanse kring als en slechts als de graaf samenhangend is en elke knoop een even graad heeft. (stelling 5.4)"

    },
    47: {
        "icon": "book",
        "question": "De tweeledige grafen K3,4 en K4,3 zijn isomorf.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Beide grafen hun incidentiematricies zijn gelijk. En twee grafen G en G’ zijn isomorf als en slechts als er een ordening van de knopen en bogen bestaat waarvoor de incidentiematrices van G en G’ gelijk zijn.  "

    },
    48: {
        "icon": "book",
        "question": "Elke tweeledige graaf heeft een tweekleuring.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Een tweeledige graaf kan per definitie opgesplitst worden in twee deelverzamelingen, zodat er enkel bogen bestaan tussen V1 en V2, maar nooit binnen V1 of V2. Hierbij is de mogelijkheid van een tweekleuring vanzelfsprekend. "

    },
    49: {
        "icon": "book",
        "question": "Elke tweeledige graaf is vlak.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "K3,3 is een voorbeeld van een tweeledige graaf. En K5 en K3,3 zij niet vlak (stelling 5.15)"

    },
    50: {
        "icon": "book",
        "question": "Elke vlakke graaf heeft een vierkleuring.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Elke vlakke graaf heeft een vierkleuring. (door K. Appel en W. Haken)"

    },
    51: {
        "icon": "book",
        "question": "K3,3 is vlak.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "K5 en K3,3 zij niet vlak (stelling 5.15)"

    },
    52: {
        "icon": "book",
        "question": "K3,3 heeft een vierkleuring.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Iedere knoop is verbonden met 3 knopen die onderlings niet verbonden zijn. Wat een vierkleuring mogelijk maakt."

    },
    53: {
        "icon": "book",
        "question": "Elke niet-vlakke graaf heeft minstens een kring.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Elke niet-vlakke graaf bevat K5 of K3,3 als subgraaf. (Stelling van Kuratowski) K5 en K3,3 bevatten beiden kringen."

    },
    54: {
        "icon": "book",
        "question": "Uit de stelling van Kuratowski volgt dat elke graaf die geen subgraaf bevat die isomorf is met K5 of K3,3 vlak is.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Een graaf is vlak als en slechts als de graaf geen deelgraaf bevat die homeomorf is met K5 of K3,3."

    },
    55: {
        "icon": "book",
        "question": "Van elke vlakke graaf kan een boom gemaakt worden door k bogen weg te halen met k het aantal kringen. ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Als we voor K3 dit toepassen, dan hebben we niet genoeg bogen over om alle knopen te verbinden. Dus is de graaf niet meer samenhangend. En een boom is een samenhangende graaf die geen kringen bevat."

    },
    56: {
        "icon": "book",
        "question": "De tijdscomplexiteit van het algoritme van Prim is linear in het aantal knopen.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "De tijdscomplexiteit van Prim is E log2 V. Dus is logaritmisch in het aantal knopen en lineair in het aantal edges."

    },
    57: {
        "icon": "book",
        "question": "De tijdscomplexiteit van het algoritme van Prim is linear in het aantal bogen.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Tijdscomplexiteit voor prim is Elog2(V). Dus is het linear in het aantal bogen. (Wina wiki zei fout)"

    },
    58: {
        "icon": "book",
        "question": "Om een opspannende boom te hebben moet een graaf samenhangend en vlak zijn. ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Een graaf moet hiervoor niet vlak zijn . Als G samenhangend is, dan bestaat er een opspannende boom T voor G. (Stelling 5.23)"

    },
    59: {
        "icon": "book",
        "question": "Een eindige taal is steeds regulier.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Indien een taal geaccepteerd wordt door een eindige machine, is de taal regulier. En een eindige taal wordt steeds geaccepteerd door een eindige automaat. "

    },
    60: {
        "icon": "book",
        "question": "Een reguliere taal bevat steeds de lege string.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "De lege string is een reguliere uitdrukking, maar een reguliere taal hoeft daarom niet de lege string te bevatten. Alle cijfers van 0 tot 100 is bv een reguliere taal en bevat geen lege string."

    },
    61: {
        "icon": "book",
        "question": "Voor elke reguliere taal L en voor elke string s kan in tijd O(n) beslist worden of s ∈ L, met n de lengte van s.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Regexen kunnen gecheckt worden in een deterministische eindige automaat. Zo’n automaat kan een string van lengte n in O(n) tijd matchen."

    },
    62: {
        "icon": "book",
        "question": "Elke eindige automaat A beslist of s ∈ L(A) in een aantal stappen O(m), met m het aantal toestanden van A.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Bv: Een string s = abababababbb van gegeven reguliere taal L =  {a,b}*{bb}, zal stoppen en beslissen dat  s ∈ L(A) na 12 stappen."

    },
    63: {
        "icon": "book",
        "question": "De verzameling {a^n b^n | n ∈ N} is een reguliere taal over {a,b,c,0,...,9}.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Geen enkel natuurlijk getal in oneindig, maar er zijn oneindig veel natuurlijke getallen. Dus voor iedere n kan je een eindige automaat maken die a^n b^n herkent, maar je kan er geen één enkele construeren voor alle mogelijke n.                                           Dit kan bewezen worden adhv de Pompstelling (stelling 4.3)                                       Bewijs: Stel dat L regulier is. Dan bestaat er volgens de pompstelling een getal k zodat |s| ≥ k en kan elke string bestaan uit s = xyz met |xy| ≤ k en |y| > 0                                                                            Stel s = aaabbb en k = 5                                       s = aa a bbb met |xy| ≤ 5 en y = bbb.                                       Een eindige automaat die s accepteert, moet xy²z ook accepteren.In dat geval bevat de string meer a's dan b's en is de taal niet correct. Contradictie."
    },
    64: {
        "icon": "book",
        "question": "De verzameling {a^n b^n | n ∈ N, 2n ≤ 20} is een reguliere taal over {a,b,c,0,...9}.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Geen enkel natuurlijk getal in oneindig, maar er zijn oneindig veel natuurlijke getallen. Dus voor iedere n kan je een eindige automaat maken die a^n b^n herkent, maar je kan er geen één enkele construeren voor alle mogelijke n. In dit voorbeeld zijn er maar 11 mogelijkheden voor n, hier kan wel een eindige automaat voor geconstrueerd worden."

    },
    65: {
        "icon": "book",
        "question": "Voor elke functie f : N → {0,1} bestaat er een Turingmachine die f berekent.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Stelling 4.6: Er bestaat een functie N→N die niet turing berekenbaar is. {0,1} ⊆ N. Je zou een oneindige rij turingmachines kunnen construeren."

    },
    66: {
        "icon": "book",
        "question": "Voor elke functie f : {0,1}² → {0,1} (d.w.z., voor elke binaire booleaanse operator) bestaat er een Turingmachine die f berekent.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Er is bewezen dat er een functie N→N bestaat waarvoor geen turing machine bestaat, als je probeert om analoog te bewijzen dat bovenstaande stelling klopt, kom je tot een contradictie."

    },
    67: {
        "icon": "book",
        "question": "Voor elke binaire booleaanse operator f bestaat er een eindige automaat die f berekent.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Iedere staat van een eindige automaat is op zichzelf een booleaanse operator, die voor een bepaalde input een bepaalde output geeft. "

    },
    68: {
        "icon": "book",
        "question": "Als L1 α L2 en L1 ∈ P, dan geldt steeds L2 ∈ P. ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Als voor twee talen L1 & L2 geldt dat L1 α L2 en L2 ∈ P dan is ook L1 ∈ P. Als L1  α L2 en L2 α L1 dan noemen we ze polynomiaal equivalent."

    },
    69: {
        "icon": "book",
        "question": "We weten zeker dat P ⊆ NP ⊆ NPC.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "P & NP liggen beide (mogelijks) in NP"

    },
    70: {
        "icon": "book",
        "question": "Een graaf met een Euleriaanse kring heeft nooit knopen met oneven graad.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Een samenhangen graaf waarvoor geldt dat alle knopen een even graad hebben heeft een Euleriaanse kring"

    },
    71: {
        "icon": "book",
        "question": "Elke graaf met enkel knopen met even graad heeft een Euleriaanse kring.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Elke graaf G heeft een Euleriaanse kring als en slechts als de graaf !samenhangend! is en elke knoop een even graad heeft."

    },
    72: {
        "icon": "book",
        "question": "Elke graaf die K5 bevat heeft zeker geen 4-kleuring.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Een graaf die een kliek N bevat zal minstens N kleuren nodig hebben."

    },
    73: {
        "icon": "book",
        "question": "Elke graaf met minder dan n componenten heeft een n-kleuring.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "De graaf moet enkelvoudig zijn. Indien de graaf enkelvoudig is, dan heeft de graaf een n-kleuring."

    },
    74: {
        "icon": "book",
        "question": "Elke vlakke graaf voldoet aan v - e + f = 2 (met v het aantal knopen, e het aantal bogen, en f het aantal zijvlakken).",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Volgens de formule van Euler voldoet een graaf aan v - e + f = 2 ASA de graaf samenhangend is  en v groter of gelijk is aan 1."

    },
    75: {
        "icon": "book",
        "question": "Het algoritme van Kruskal en het algoritme van Prim zijn twee verschillende manieren om hetzelfde probleem op te lossen.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Beiden zijn algoritmes voor het vinden van een minimaal opspannende boom in een gewogen graaf."

    },
    76: {
        "icon": "book",
        "question": "Het algoritme van Kruskal en het Algoritme van Prim geven steeds dezelfde uitkomst. ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 2,
        "answer-exp": "Prim kiest herhalend een nieuwe edge met het laagst mogelijke gewicht. Indien er nu meerdere zo’n edges bestaan, zijn er ook meerdere oplossingen mogelijk. Prim en Kruskal garanderen enkel dezelfde oplossing indien ieder gewicht in de graaf uniek is."

    },
    77: {
        "icon": "book",
        "question": "Een gericht deel van een complete tralie bevat ook zijn supremum.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Bevat sowieso bovengrens, maar niet per se supremum."

    },
    78: {
        "icon": "book",
        "question": "Een gericht deel van een complete tralie bevat ook zijn infimum.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Gericht deel bevat telkens een bovengrens."
    },
    79: {
        "icon": "book",
        "question": "De recursievergelijking T(n+1) = T(n)+f(n) met f een polynoom van de k-de graad heeft als oplossing een polynoom van graad k",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Polynoom is dan van graad k+1."
    },
    79: {
        "icon": "book",
        "question": "indien P = NP dan volgt daaruit dat NPC = ∅ (∅ is de lege verzameling).",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "NPC is nog apart."
    },
    80: {
        "icon": "book",
        "question": "de verzameling van alle functies van N naar N is aftelbaar.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "A set is countable if its elements can be placed in a 1-to-1 correspondence with the natural numbers."
    },
    81: {
        "icon": "book",
        "question": "Als f = O(g) en h = O(g) dan f = h.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Tegenvoorbeeld vinden is triviaal."
    },
    82: {
        "icon": "book",
        "question": "Als L een reguliere taal is en A ⊂ L dan is A ook regulier.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "N is regulier, Priemgetallen niet."
    },
    83: {
        "icon": "book",
        "question": "Als L een reguliere taal is en L ⊂ A dan is A ook regulier.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": ""
    },
    84: {
        "icon": "book",
        "question": "N bevat niet-aftelbaar veel getallen.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "N bevat aftelbaar veel getallen. Als A deel is van N dan is A: eindig, leeg of aftelbaar."
    },
    85: {
        "icon": "book",
        "question": "N bevat een niet-aftelbare deelverzameling.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Als A C_ N dan is A: eindig, leeg of aftelbaar."
    },
    86: {
        "icon": "book",
        "question": "Met elke taal komt een reguliere expressie overeen die precies dezelfde verzameling strings definieert.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Fout. Er bestaan talen die niet regulier zijn."
    },
    87: {
        "icon": "book",
        "question": "Als S en T reguliere verzamelingen zijn, is T S∗T ook een reguliere verzameling.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "TS*T is een expressie van zichzelf en die ook regulier."
    },
    88: {
        "icon": "book",
        "question": "Als S een eindige reguliere verzameling is, is S ∗ ook eindig. ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 2,
        "answer-exp": "Fout"
    },
    89: {
        "icon": "book",
        "question": "{a}∗ is een oneindig lange string.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 2,
        "answer-exp": "Een oneindig lange string bestaat niet."
    },
    90: {
        "icon": "book",
        "question": "Elke taal waarvoor een algoritme geschreven kan worden dat die taal herkent, kan ook door een niet-deterministische eindige automaat herkend worden.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 2,
        "answer-exp": "Fout."
    },
    91: {
        "icon": "book",
        "question": "Als er voor een bepaalde string x ∈ Σ∗ een pad is van de begintoestand naar een niet-aanvaardbare eindtoestand zodat de concatenatie van de labels van de gevolgde pijlen de string x oplevert, dan wordt x niet aanvaard.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 2,
        "answer-exp": "Niet waar. Als er een ander pad is dat eindigt in een aanvaardbare eindtoestand wordt x aanvaard. Voor deterministische eindige automaten is deze stelling wel waar, want daar is er voor elke invoerstring juist één pad. "
    },
    92: {
        "icon": "book",
        "question": "Als er voor een bepaalde string x ∈ Σ∗ een pad is van de begintoestand naar een aanvaardbare eindtoestand zodat de concatenatie van de labels van de gevolgde pijlen de string x oplevert, dan wordt x aanvaard.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 1,
        "answer-exp": "Waar. De voorwaarde uit deﬁnitie 4.9 is dan vervuld, want de doorsnede δ∗(q0,x) ∩ F bevat minstens één element en is dus niet leeg. Ook voor deterministische eindige automaten is dit waar."
    },
    93: {
        "icon": "book",
        "question": "Deterministische en niet-deterministische Turing-machines herkennen dezelfde klasse van talen.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Waar."
    },
    94: {
        "icon": "book",
        "question": "NPC is een deelverzameling van NP.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Waar."
    },
    95: {
        "icon": "book",
        "question": "Of P gelijk is aan NP of niet, in beide gevallen is P verschillend van NPC.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Waar."
    },
    96: {
        "icon": "book",
        "question": "De capaciteit van elke snede is niet kleiner dan eender welke stroming.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Waar."
    },
    97: {
        "icon": "book",
        "question": "Elke monotone operator T heeft de eigenschap dat a een vast punt is als en slechts als T(T(a)) = a. ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "T(a) = a is een vast punt."
    },
    98: {
        "icon": "book",
        "question": "Voor elke reguliere taal bestaat er een getal n ∈ N zodat alle strings in die taal ten hoogste n tekens bevatten.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": ""
    },
    99: {
        "icon": "book",
        "question": "Voor elke reguliere taal bestaat een Turingmachine die de taal herkent. ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Waar."
    },
    100: {
        "icon": "book",
        "question": "NPC is een strikte deelverzameling van NP.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Waar."
    },
    101: {
        "icon": "book",
        "question": "Als L1 ∝ L2 en L2 ∝ L3, dan geldt L1 ∝ L3. ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Juist."
    },
    102: {
        "icon": "book",
        "question": "Als twee grafen homeomorf zijn, hebben ze evenveel knopen.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Fout. Evenveel knopen is isomorfisme."
    },
    103: {
        "icon": "book",
        "question": "Een tweeledige graaf kan geen deelgraaf hebben die isomorf is met K3.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Waar."
    },
    104: {
        "icon": "book",
        "question": "In een tweeledige graaf (V1 ∪V2, E) met E ⊆ V1 ×V2, is een volledige matching tussen V1 en V2 steeds mogelijk als er een S1 ⊆ V1 en S2 ⊆ V2 bestaan zodat S1 × S2 ⊆ E en #S1 ≤ #S2.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": ""
    },
    105: {
        "icon": "book",
        "question": "In een complete tralie is het supremum van een verzameling steeds een element van die verzameling.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "x € [5;6[ 6 ligt er niet in maar is wel T"
    },
    106: {
        "icon": "book",
        "question": "Een vlakke graaf G(V,E) waarvoor v − e + f = 2 waar is, is enkelvoudig.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Fout. Een samenhangende vlakke graaf."
    },
    107: {
        "icon": "book",
        "question": "Een vlakke graaf G(V,E) waarvoor v − e + f = 2 waar is, is samenhangend.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Waar."
    },
    108: {
        "icon": "book",
        "question": "Er bestaat een taal die door geen enkele Turing machine beslist wordt.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Waar."
    },
    109: {
        "icon": "book",
        "question": "Elke taal die beslist wordt door een algoritme met complexiteit O(n²), wordt ook beslist door een algoritme met complexiteit O(n³)",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 1,
        "answer-exp": "Waar. Y not."
    },
    110: {
        "icon": "book",
        "question": "Een minimaal opspannende boom van een graaf is enkelvoudig",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 1,
        "answer-exp": "Waar.Enkelvoudig, bevat geen lussen noch parallelle bogen."
    },
    111: {
        "icon": "book",
        "question": "Als een graaf een Euleriaans pad heeft, dan is de graaf vlak ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 2,
        "answer-exp": ""
    },
    112: {
        "icon": "book",
        "question": "Elk transportnetwerk heeft een minimale stroming.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 1,
        "answer-exp": ""
    },
    113: {
        "icon": "book",
        "question": "Elk transportnetwerk heeft een maximale snede.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 1,
        "answer-exp": "Waar."
    },
    114: {
        "icon": "book",
        "question": "Op geen enkele complete tralie bestaat een niet-monotone continue afbeelding",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 1,
        "answer-exp": "Waar. Mono = sup(T(x)) =< T(sup(x))  en continu = T(sup(x))=sup(T(x)) en continu impliceert monotoon"
    },
    115: {
        "icon": "book",
        "question": "Elke eindige partieel geordende verzameling is een complete tralie ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 2,
        "answer-exp": "Fout."
    },
    116: {
        "icon": "book",
        "question": "De concatenatie van twee reguliere talen is een reguliere taal.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 1,
        "answer-exp": "Noteer met ωi de reguliere expressie voor Li. De reguliere expressie (ω1)(ω2) bepaalt de taal L1L2, die dus regulier is.."
    },
    117: {
        "icon": "book",
        "question": "Elke deelverzameling van een taal is een taal.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 1,
        "answer-exp": "Waar: ⊆ is transitief: als B ⊆ A ⊆ Σ∗ dan is ook B ⊆ Σ∗"
    },
    118: {
        "icon": "book",
        "question": "Elke deelverzameling V van een reguliere taal R (V ⊆ R) is een reguliere taal.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 2,
        "answer-exp": "Niet waar: {0^n1^n|n ∈ N} ⊂ 0∗1∗ ⊂ Σ∗ Opmerking: Als dit waar zou zijn, dan zou elke taal regulier zijn, want Σ∗ is regulier"
    },
    119: {
        "icon": "book",
        "question": "Elke verzameling V die een reguliere taal R omvat (R ⊆ V ) is een reguliere taal.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 2,
        "answer-exp": "Niet waar: {01,0011} ⊆ {0^n1^n|n ∈ N}"
    },
    120: {
        "icon": "book",
        "question": "De verzameling van reguliere expressies over een gegeven alfabet Σ is zelf een reguliere taal.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 2,
        "answer-exp": "Niet waar: een geldige reguliere expressie kan geneste haakjes bevatten en een taal van strings met geneste haakjes is, net als {0^n1^n|n ∈ N}, niet regulier."
    },
    121: {
        "icon": "book",
        "question": "Voor elke niet deterministische eindige automaat is er ook een deterministische eindige automaat die dezelfde taal herkent.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 1,
        "answer-exp": "Dit is stelling 4.4 vanuit de cursus. Voor elke niet-determinische eindige automaat bestaat er een deterministische automaat die dezelfde taal herkent."
    },
    122: {
        "icon": "book",
        "question": "Sommige niet deterministische eindige automaten herkennen niet-reguliere talen.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer-img": "",
        "answer": 2,
        "answer-exp": "Niet waar. Volgens stelling 4.4 is er voor elke niet-deterministische automaat een deterministische die dezelfde taal herkent, en volgens stelling 4.2 zijn talen die door een deterministische eindige automaat herkend worden reguliere talen."
    },
    123: {
        "icon": "book",
        "question": "Er bestaan niet deterministische eindige automaten zonder λ-pijlen en zonder meerdere pijlen vanuit dezelfde toestand met hetzelfde label, die toch geen deterministische eindige automaten zijn.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Als er vanuit een bepaalde toestand niet voor elk symbool uit het alfabet een pijl vertrekt, dan is het strikt genomen geen deterministische eindige automaat. Bij niet deterministische eindige automaten mag dit wel."
    },
    124: {
        "icon": "book",
        "question": "Er zijn oneindig veel Turing machines.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",
        "answer-exp": "Waar: voor elke n ∈ N kan je een Turing machine maken die de constante functie f : N → N : x → n berekent. Dit zijn uiteraard allemaal verschillende Turing machines, en het zijn er oneindig veel."
    },
    125: {
        "icon": "book",
        "question": "Het aantal Turing machines met n toestanden en m symbolen is eindig.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Niet waar, aangezien niet elke Turing machine over dezelfde m symbolen hoeft te zijn. Als we aannemen dat de m symbolen vast staan, dan is de stelling wel waar, en kunnen we een bovengrens schatten op het aantal machines. Formeel kan dit als volgt (alhoewel informeel ook voldoende is): het programma P is een functie van een verzameling met hoogstens nm elementen naar een verzameling met 3nm elementen. Zo zijn er hoogstens (3nm+1)^nm. Er zijn 2^n mogelijke deelverzamelingen van Q (Q heeft n elementen), dus dat is ook het aantal mogelijke verzamelingen F van aanvaardbare eindtoestanden. Ook het aantal mogelijke verzamelingen T van invoersymbolen is eindig, namelijk 2^m−1 (waarom?). Er kunnen dus zeker niet meer dan (3nm + 1)^(nm)2^(n+m−1) Turing machines zijn met n toestanden en m symbolen."
    },
    126: {
        "icon": "book",
        "question": "f, g en h zijn functies van N naar R+. f is O(g) ⇒ ∀n ∈ N: f(n) ≤ g(n)",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",
        "answer-exp": "Niet waar. Tegenvoorbeeld: neem f(x) = 2x en g(x) = x. Dan geldt f is O(g) (f en g zijn zelfs asymptotisch equivalent), maar bijvoorbeeld voor n = 1 hebben we f(1) = 2 > g(1) = 1 (meer in het bijzonder is zelfs voor elke n > 0 f(n) > g(n)). Merk op dat er ook wel functies f en g bestaan met f is O(g) zodat voor elke n ∈ N: f(n) ≤ g(n). Neem bijvoorbeeld f(x) = x en g(x) = 2x. Maar dit geldt dus zeker niet altijd"
    },
    127: {
        "icon": "book",
        "question": "f, g en h zijn functies van N naar R+. f is O(n^2) en g is ook O(n^2) ⇒ fg is O(n^4).",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,     
        "answer-img": "img/oefz3.1.4.JPG",                
        "answer-exp": ""
    }
    ,
    128: {
        "icon": "book",
        "question": "f, g en h zijn functies van N naar R+. f is O(g) ⇒ f is O(g + h).",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "img/oefz3.1.4c.JPG",                
        "answer-exp": ""
    },
    129: {
        "icon": "book",
        "question": "f, g en h zijn functies van N naar R+. g : N → R+ : n → f(n + 1) is asymptotisch equivalent met f. ",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "img/oefz3.1.4d.JPG",                        
        "answer-exp": ""
    },
    130: {
        "icon": "book",
        "question": "f, g en h zijn functies van N naar R+. Als f en g asymptotisch equivalent zijn en h is O(g), dan zijn f en g+h asymptotisch equivalent.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "img/oefz3.1.4e.JPG",                        
        "answer-exp": ""
    },
    131: {
        "icon": "book",
        "question": "f, g en h zijn functies van N naar R+. f is niet O(g) ⇒ g is O(f).",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "Niet waar. Het kan zijn dat f is niet O(g) en g is niet O(f). Zie bijvoorbeeld 3.1.3b."
    },
    132: {
        "icon": "book",
        "question": "f, g en h zijn functies van N naar R+. Als f asymptotisch equivalent is met n2, dan is f een veeltermfunctie.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-exp": "Niet waar. Tegenvoorbeeld: f(x) = x2 +logx. Dan is f asymptotisch equivalent met x2 maar geen veeltermfunctie."
    },
    133: {
        "icon": "book",
        "question": "Alle recursieve talen zitten in P",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "img/oefz4.1.4a.JPG",                                
        "answer-exp": ""
    },
    134: {
        "icon": "book",
        "question": "Elke recursief opsombare taal is recursief.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "img/oefz4.1.4b.JPG",                            
        "answer-exp": ""
    },
    135: {
        "icon": "book",
        "question": "Duale grafen van twee isomorfe grafen zijn isomorf.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "img/oefz6.6.3.JPG",                            
        "answer-exp": "Nee. De duale graaf kan anders zijn als de oorspronkelijke graaf anders getekend wordt. Voorbeeld: de volgende grafen zijn isomorf maar hun dualen niet, want in het eerste geval heeft de duale een knoop van graad 5 (die voor het buitenvlak), terwijl in het tweede geval geen enkele knoop graad hoger dan 4 heeft (geen enkel gebied grenst aan 5 of meer gebieden, ook niet het buitenvlak)."
    },
    136: {
        "icon": "book",
        "question": "Het gesloten interval [a,b] ⊂ Z met orde ≤ is een complete tralie.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",                                
        "answer-exp": "Waar: voor elke deelverzameling X ⊆ L met L = [a,b] ∩ Z, is inf(X) het kleinste element van X en sup(X) het grootste. Aangezien het over eindige verzamelingen gaat en ∀x,y ∈ Z : x ≤ y ∨ y ≤ x bestaan die elementen."
    },
    137: {
        "icon": "book",
        "question": "Het gesloten interval [a,b] ⊂ Q met orde ≤ is een complete tralie",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",                                
        "answer-exp": "Niet waar: kies een willekeurig irrationaal getal c tussen a en b, dan heeft X = [a,c[ geen supremum in Q en dus ook niet in L = [a,b] ∩ Q. Als a 6= b bestaat er zo een c."
    },
    138: {
        "icon": "book",
        "question": "Het gesloten interval [a,b] ⊂ R met orde ≤ is een complete tralie.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",                                
        "answer-exp": "Waar. Zie cursus analyse."
    },
    139: {
        "icon": "book",
        "question": "Het open interval ]a,b[⊂ N met orde ≤ is een complete tralie",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 1,
        "answer-img": "",                                
        "answer-exp": "Waar: we weten dat ]a,b[= [a + 1,b − 1] ∩ Z"
    },
    140: {
        "icon": "book",
        "question": " Het open interval ]a,b[⊂ R met orde ≤ is een complete tralie.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "",                                
        "answer-exp": "Niet waar: Voor de deelverzameling X ⊆ L met X =]a,b[ (maar bijvoorbeeld ook voor elke deelverzameling van de aard X = [c,b[, met a < c < b), is het supremum b. b is echter geen onderdeel van de geordende verzameling L,≤ met L =]a,b[, en is dus geen geldig supremum."
    },
    141: {
        "icon": "book",
        "question": "Er zijn continue afbeeldingen die niet monotoon zijn en monotone afbeeldingen die niet continu zijn.",
        "options": {
            1: "Juist",
            2: "Fout",
        },
        "answer": 2,
        "answer-img": "img/oefz9.2.2.4.JPG",                                
        "answer-exp": ""
    }
};

/*



*/






