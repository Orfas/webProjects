
jQuery(document).ready(function(){
    // объявляем слайдеры, 
    $("#red").slider({ 
        animate: "slow", // плавное передвижение ползунка
        range: "min", // диапазон ползунка(от начала до ползунка)      
        value: 255, // стандартное значение в 255, чтобы фон корректно отображался
        max: 255, // максиальное значение слайдера, 255 - максимальное число в rgb схеме
        slide: function( event, ui ) { // на каждое передвижение ползунка
            var selection = ui.value; // записываем его новое значение
            
            if (typeColor == 'color'){ // проверяем какой цвет сейчас изменяется, если меняется цвет текста
                selection = newColor('red', selection,typeColor) // отправляем цвет, текущее значение и цвет,который мы меняем для получения новой rgb схемы
                $("#textToSwitch").css({ // переписываем на новый цвет 
                    color: selection
                    
                });
            }
            else{ // если меняется цвет фона
                selection = newColor('red', selection,typeColor)
                $("#textToSwitch").css({
                    backgroundColor: selection
                });
            }
        }
    });
    
    $("#green").slider({
        animate: "slow", // плавное передвижение ползунка
        range: "min", // диапазон ползунка(от начала до ползунка)      
        value: 255, // стандартное значение в 255, чтобы фон корректно отображался
        max: 255, // максиальное значение слайдера, 255 - максимальное число в rgb схеме
        slide: function( event, ui ) { // на каждое передвижение ползунка
            var selection = ui.value; // записываем его новое значение
            
            if (typeColor == 'color'){
                selection = newColor('green', selection,typeColor)
                $("#textToSwitch").css({
                    color: selection
                    
                });
            }
            else{
                selection = newColor('green', selection,typeColor)
                $("#textToSwitch").css({
                    
                    backgroundColor: selection
                });
            }
        }
    });
    $("#blue").slider({
        animate: "slow", // плавное передвижение ползунка
        range: "min", // диапазон ползунка(от начала до ползунка)      
        value: 255, // стандартное значение в 255, чтобы фон корректно отображался
        max: 255, // максиальное значение слайдера, 255 - максимальное число в rgb схеме
        slide: function( event, ui ) { // на каждое передвижение ползунка
            var selection = ui.value; // записываем его новое значение
            
            if (typeColor == 'color'){
                selection = newColor('blue', selection,typeColor);
                $("#textToSwitch").css({
                    color: selection
                    
                });
            }
            else{
                selection = newColor('blue', selection,typeColor);
                $("#textToSwitch").css({
                    backgroundColor: selection
                });
            }
        }
    });
    // начальные значения цвета шрифта
    var redColor = 0;
    var greenColor = 0; 
    var blueColor = 0; 
    // начальные значения фона шрифта
    var redBackground = 255; 
    var greenBackground = 255; 
    var blueBackground = 255; 
    var typeColor = 'color'; // начальный тип цвета - цвет шрифта
    saveValues('background-color'); // сохраняем значения фона

    // Функция сохранения новых значений и отрисовки значений другого цвета
    function saveValues(typeToSave){
        if (typeToSave == "background-color"){ // если выбран цвет шрифта, то сохраняем значения цвета фона по слайдерам
            redBackground = $( "#red" ).slider( "value" );
            greenBackground = $( "#green" ).slider( "value" );
            blueBackground = $( "#blue" ).slider( "value" );
            $( "#red" ).slider({ // на слайдерах выставляем значения цвета шрифта
               value: redColor 
            });
            $( "#green" ).slider({
                value: greenColor 
             });
             $( "#blue" ).slider({
                value: blueColor 
             });
        }
        else if (typeToSave == "color"){ // тоже самое, только для цвета фона
            redColor = $( "#red" ).slider( "value" );
            greenColor = $( "#green" ).slider( "value" );
            blueColor = $( "#blue" ).slider( "value" );
            $( "#red" ).slider({
               value: redBackground 
            });
            $( "#green" ).slider({
                value: greenBackground 
             });
             $( "#blue" ).slider({
                value: blueBackground 
             });
        }
    }

    // обработчик нажатия radio-кнопок
    radios.onchange = function(e){
        if(e.target.value == "color"){ // если выбрали цвет шрифта
            saveValues('background-color'); // сохраняем значения цвета фона
            typeColor = 'color'; // ставим текущий цвет, как цвет шрифта
        }
        else{
            saveValues('color'); // тоже самое для цвета фона
            typeColor = 'backgroung-color';
        }
    }

    // Функция на запись нового цвета в формате rgb
    function newColor(color, value,typeColor){ // получаем на вход название цвета, числовое значение слайдера и тип цвета( шрифт или фон )
        if ( typeColor == 'color'){ // в зависимости от типа цвета( шрифт или фон )
            switch (color){ // мы меняем по наванию цвета числовое значение этого параметра в формате rgb
                case 'red':
                    redColor = value;
                break;
                case 'blue':
                    blueColor = value;
                break;
                case 'green':
                    greenColor = value;
                break;
                default:
                break;
                
            }
            color = 'rgb('+ redColor + ','+ greenColor + ',' + blueColor + ')'; //и передаем на выход строку, содержащую новые данные
            return color;
        }
        else { // если фон, то
            switch (color){ // мы меняем по наванию цвета числовое значение этого параметра в формате rgb
                case 'red':
                    redBackground = value;
                break;
                case 'blue':
                    blueBackground = value;
                break;
                case 'green':
                    greenBackground = value;
                break;
                default:
                break;
                
            }
            color = 'rgb('+ redBackground + ','+ greenBackground + ',' + blueBackground + ')'; //и передаем на выход строку, содержащую новые данные
            return color;
        }
        
    }
    

});