let listToSort = []; // Массив ячеек выбранного столбца который мы сортируем/по которому совершаем поиск
let fullList = []; // Массив изначальных значений таблицы, нужен для сброса поиска или фильтрации
let seachFlag = false; // Если мы не укажем колонку для поиска, то по флагу будет поиск по всей таблице

// Функция сортировки столбца по возрастанию
function sortColumn(column){ 
    let getList = getColumnList(column); // Получаем массив для сортировки (0 : массив значений столбца, 1 : номер стобца для сортировки, 2 : количество строк таблицы)
    let listToSort = getList[0]; // список элементов столбца
    let numberOfColumn = getList[1]; // номер столбца
    let rowsNumber = getList[2]; // количество строк в столбце
    let buttonStyle = document.querySelectorAll('button.sort i'); // меняем стиль стрелочек у кнопок в столбце в соответствии с последней сортировкой
    if (buttonStyle[numberOfColumn].className == "fa fa-sort" || buttonStyle[numberOfColumn].className == "fa fa-sort-asc"){
        
        listToSort.sort(); // Сортируем массив значений
        buttonStyle[numberOfColumn].className = "fa fa-sort-desc";
    }
    else{
        listToSort.reverse();
        buttonStyle[numberOfColumn].className = "fa fa-sort-asc";
    }

    for (let i = 0; i < listToSort.length; i++){
        if (listToSort[0] == '' || listToSort[0] == ' '){
            listToSort.push(listToSort.shift());
        }
        else break;
    } 
    for ( let i = 1; i < rowsNumber.length; i++ ){ // Переписываем построчно каждое значение стобца уже отсортированным массивом
        let columnToSort = rowsNumber[i];
        columnToSort = columnToSort.querySelectorAll("td");

        columnToSort[numberOfColumn].innerHTML =  listToSort[i-1];
        
    }
}

// Поиск в столбце по введенной строке
function searchList(){
    let textToSearch = document.getElementById("text_to_search").value; // Забираем значение из input'а
    order = 0;
    let positionsToTheTop = []; // массив позиций содержащих подстроку
    let getList = pickedColumnForSearch(); // Проверяем в каком стобце должен быть поиск
    
    if (!seachFlag){
        let listToSort = getList[0]; // список элементов столбца
        let numberOfColumn = getList[1]; // номер столбца
        let rowsNumber = getList[2]; // количество строк в столбце

        
        for ( let i = 1; i < rowsNumber.length; i++ ){ // Проходим построчно столбец проверяя на подстроку
            let cellToSort = rowsNumber[i];
            cellToSort = cellToSort.querySelectorAll("td");
            if (listToSort[i-1].includes(textToSearch) ){ // Если введенный текст есть в виде подстроки в ячейке таблицы, то запоминаем его номер(пушим в массив)
                cellToSort[numberOfColumn].innerHTML =  listToSort[i-1];
                positionsToTheTop.push(i-1);
            }
            else { // Если его нет, то оставляем в виде пустой ячейки
                cellToSort[numberOfColumn].innerHTML =  "";
            }
        }
        sortColumnFindedItems(positionsToTheTop); // Сортируем полученный массив значений, чтобы поднять непустые значения наверх       
    }
    else {
        let rowsNumber = document.querySelectorAll("tr"); // получаем общее количество строк таблицы
        for ( let i = 1; i < rowsNumber.length; i++ ){ // для каждой строки по номеру столбца мы забираем значение в массив
            let columnToSort = rowsNumber[i];
            columnToSort = columnToSort.querySelectorAll("td");
            
            if ( i == 1){ // на первой итерации создаем массив из количества столбцов в таблице
                for ( let j = 0; j < columnToSort.length; j++){
                    positionsToTheTop.push([]);
                }
            }
            
            for ( let j = 0; j < columnToSort.length; j++){ // если ячейка содержит подстроку, то пушим в массив позицию в столбце
                if (columnToSort[j].textContent.includes(textToSearch) ){
                    positionsToTheTop[j].push(i-1);
                }
                else{ // иначе присваиваем пустоту ячейке
                    columnToSort[j].innerHTML = "";
                }
            }  
        }
        sortAllFindedItems(positionsToTheTop); // Сортируем полученный массив значений, чтобы поднять непустые значения наверх       
    }
    seachFlag = false; // сбрасываем флаг поиска по всем элементам
}

// Проверяем номер стобца по входному параметру и возвращаем числовое значение
function checkNumberOfColumn(columnNumber){
    let numberOfColumnsAtAll = document.querySelectorAll("td");  
    let position = 0; 
    for (let i = 1; i < numberOfColumnsAtAll.length; i++){
        if (columnNumber == "list"+i) {
            position = i-1;
            break;
        }   
    } 
    return (position); 
}

// Функция получения массива значений столбца, параметр на вход "list+номер столбца"
function getColumnList(column){
    listToSort = []; // обнуляем список, чтобы избежать записи на старые данные
    let numberOfColumn = checkNumberOfColumn(column); // вызываем функцию для возврата номера столбца
    let rowsNumber = document.querySelectorAll("tr"); // получаем общее количество строк таблицы
    for ( let i = 1; i < rowsNumber.length; i++ ){ // для каждой строки по номеру столбца мы забираем значение в массив
        let columnToSort = rowsNumber[i];
        columnToSort = columnToSort.querySelectorAll("td");
        listToSort.push(columnToSort[numberOfColumn].textContent); 
    }
    return [listToSort, numberOfColumn, rowsNumber]; //возврат массива значений, норер столбца в виде цифры и количество строк в виде числа
    

}

// Функция проверки выбранного чекбокса(радио-кнопку) для поиску по столбцу
function pickedColumnForSearch(){
    let checkboxColumn = document.getElementsByClassName("checkbox_to_search"); // список кнопок
    for (i = 0; i < checkboxColumn.length; i++){ // Проверяем поочередно каждую радиокнопку
        if (checkboxColumn[i].checked) break; // как только нашли выбранную кнопку - выходим из массива
    }
    i++;
    if ( i > checkboxColumn.length) { // если ни одна кнопка не выбрана - ставим флаг,что поиск по всем столбцам
        seachFlag = true;
    }
    else {
        seachFlag = false; // поиск по одному столбцу
        let column = 'list'+i; // колонка по которой будет поиск
        let numberOfColumn = getColumnList(column); // получаем номер колонки
        return (numberOfColumn); // Возвращаем номер колонки для сортировки
    }
}
 
// Сортировка найденный элементов, чтобы опустить пробелы вниз и сохранить правильный порядок сортировки
function sortColumnFindedItems(positionsToTheTop,column = -1){
    let getList; // столбец в котором будет поиск
    let listToSort; // массив элементов столбца
    let numberOfColumn; // номер столбца
    let rowsNumber; // количество строк
    if (column == -1){ // если была выбрана кнопка колонки для поиска
        getList = pickedColumnForSearch(); // Проверяем в каком стобце должен быть поиск
        listToSort = getList[0]; // список элементов столбца
        numberOfColumn = getList[1]; // номер столбца
        rowsNumber = getList[2]; // количество строк в столбце
    }
    else {
        column++;
        getList = getColumnList('list'+column); // Проверяем в каком стобце должен быть поиск
        listToSort = getList[0]; // список элементов столбца
        numberOfColumn = getList[1]; // номер столбца
        rowsNumber = getList[2]; // количество строк в столбце
    }
    for ( let i = 0; i < positionsToTheTop.length; i++){ // Проходим в цикле по позициям элементов,которые прошли проверку и поднимаем их в верх строки
        let positionToChange = positionsToTheTop[i]; // строка, содержащая подстроку поиска
        if (i != positionsToTheTop[i]){ // если текущая позиция не равна позиции в списке, то меняем элемент этой строки на элемент списка
            listToSort[i] = listToSort[positionsToTheTop[i]];
            listToSort[positionToChange] = " "; // старое место элемента делаем пустым
        } 
    }
    for ( let i = 1; i < rowsNumber.length; i++ ){ // Переписываем на странице столбец в соответствии с новым массивом
        let columnToSort = rowsNumber[i];
        columnToSort = columnToSort.querySelectorAll("td");
        columnToSort[numberOfColumn].innerHTML =  listToSort[i-1];   
    }
}

// Функция сортировки всех столбцов, если не выбран ни один из них, на вход получаем массив состоящий из j(количество столбцов) массивов, в каждом из которых указаны позиции строк,прошедших поиск
function sortAllFindedItems(list){
    let rowsNumber = document.querySelectorAll("tr"); // получаем общее количество строк таблицы
    let maxRows = -1; // максимальное количество непустых строк, изначально -1,чтобы было удобно обрабатывать
    let columnToSort = rowsNumber[1];
    columnToSort = columnToSort.querySelectorAll("td");
    for ( let j = 0; j < columnToSort.length; j++){ // сортируем по каждому столбцу каждый массив
        sortColumnFindedItems(list[j],j); // на выходе получим измененный уже в html-файле массив элементов,прошедших проверку( содержащих подстроку )
    }
    for ( let j = 0; j < columnToSort.length; j++){ // Ищем среди этих столбцов наибольнее количество непустых строк
        maxRows = findMaxRows(j,maxRows);
    }
    for ( let j = 0; j < columnToSort.length ; j++){ // Убираем все пустые строки из таблицы,чтобы пагинация была только по непустым строкам
        removeEmptyCells(j,maxRows);
        
    }
    navigation('first');   
}

// Функция возврата к изначальным значениям списка
function clearSearchList(){
    let rowsNumber = saveOldList(); // Функция сохранения изначальных значений, от нее мы получим количество строк изначальное в нашей таблице
    let order = 0; // Переменная, чтобы поочередно пройтись по каждому элементу массива изначальных значений
    for ( let i = 1; i < rowsNumber.length; i++ ){ // для каждой строки по номеру столбца мы забираем значение в массив
        let columnToSort = rowsNumber[i];
        columnToSort = columnToSort.querySelectorAll("td");
        for ( let j = 0; j < columnToSort.length; j++){
            columnToSort[j].innerHTML = fullList[order];
            order++;
        }
        rowsNumber[i].hidden = false; // Показываем все скрытые ранее строки при поиске
        rowsNumber[i].style.display = "";  // Убираем 'nine' для неподходящих ранее строк
    }
    
    let checkboxColumn = document.getElementsByClassName("checkbox_to_search"); 
    for (i = 0; i < checkboxColumn.length; i++){ // Проверяем поочередно каждую радиокнопку
        checkboxColumn[i].checked = false;
    }
    let buttonStyle = document.querySelectorAll('button.sort i');
    for (i = 0; i < buttonStyle.length; i++){
        buttonStyle[i].className = "fa fa-sort";
    }
    navigation('first');
}

// Функция для сохранения изначальных значений списка
function saveOldList(){
    let rowsNumber = document.querySelectorAll("tr"); // получаем общее количество строк таблицы
    for ( let i = 1; i < rowsNumber.length; i++ ){ // для каждой строки по номеру столбца мы забираем значение в массив 
        let columnToSort = rowsNumber[i];
        columnToSort = columnToSort.querySelectorAll("td");
        for ( let j = 0; j < columnToSort.length; j++){
            fullList.push(columnToSort[j].textContent);
        }  
    }
    return rowsNumber;
}

// Пагинация, позволяющая отображать постранично элементы таблицы, входной параметр - кнопка, которую мы выбрали( при старте страницы - первая)
function navigation(list){ 
    let rowsNumber = document.querySelectorAll("tr");    
    let currentPage = document.querySelector(".navigation  a").innerHTML; // Смотрим какая страница сейчас указана на сайте
    let numberOfRows =50; // Количество строк на 1 странице
    let lenPages = 0; // Количество страниц для пагинации 
    let lenRows = 0; // Количество строк в полученном массиве, нужно для правилнього подсчета страниц при загрузке и после поиска на странице
    for ( i = 1;i < rowsNumber.length; i++ ){
        if (rowsNumber[i].style.display == "none"){ // Как только мы находим строку первую после результатов поиска
            lenRows = i; // запоминаем её индекс и выходим. Все строки не прошедшие проверку поиска имеют свойство 'none' в display
            break;
        }
        else {
            lenRows = rowsNumber.length; // Если все элементы прошли поиск или поиска еще не было, мы работаем со всеми строками
        }
        
    }

    if ( ( lenRows  % +numberOfRows ) != 1 ){ // Проверка на целое количество строк. "!= 1" потому что у нас есть строка с кнопками на сортировку и она тоже учитывается при подсчете общего количества строк
        lenPages = Math.trunc(lenRows / numberOfRows + 1) ; 
    }
    else {
        lenPages = Math.trunc(lenRows / numberOfRows );
    }
    let page = getPageNumber(currentPage,list,lenPages); // Вызываем функцию получения нового номера страницы в зависимости от кнопки, на которую нажали
    document.querySelector(".navigation  a").innerHTML=page; // Переписываем значение на странице
    page--; // Уменьшаем на 1, тк индексы идут с 0,а интерфейсовые значения с 1 для удобства пользователя
    for (let i = 1; i < rowsNumber.length; i++){ // В цикле проходим и скрываем все элементы, которые не находятся на текущей странице
        if ((i <= numberOfRows*page+numberOfRows) && (i > numberOfRows*page)){
            rowsNumber[i].hidden = false;
            
        }
        else{
            rowsNumber[i].hidden = true;
            
        }
    } 
}

// Получаем номер страницы числом по параметрам ( текущий номер страницы; параметр вызыва функии пагинации:fist,last,next,prev; количество страниц пагинации ) 
function getPageNumber(currentPage,page,len){
    if (page == 'first'){
        return +1;
    }
    else if (page == 'last'){
        return (+len);
    }
    else if ( page == 'prev'){
        if ((+currentPage-1) < 1 ){
            return +currentPage;
        }
        else{
            return (+currentPage-1);
        }
        
    }
    else if (page == 'next'){
        if (( +currentPage+1 ) > len ){
            return +currentPage;
        }
        else{
            return (+currentPage+1);
        }
    }
}

// Поиск максимального количества непустых строк в таблице после поиска. Параметры на вход: столбец для поиска; старое значение максимального количества строк.
function findMaxRows(column, maxRows){
    let rowsNumber = document.querySelectorAll("tr"); // получаем общее количество строк таблицы
    let columnMaxRows = rowsNumber.length; // максимальное количество непустых строк в столбце
    for ( let i = 1; i < rowsNumber.length; i++ ){ // для каждой строки по номеру столбца мы забираем значение в массив
        let columnToSort = rowsNumber[i];
        columnToSort = columnToSort.querySelectorAll("td");
        if (columnToSort[column].innerHTML == "" || columnToSort[column].innerHTML == " "){ // если находится пустая строка в столбце просто уменьшаем максимум на 1
            columnMaxRows--;
        }  
    }
    if (maxRows > columnMaxRows){ // возвращаем максимум из старого и нового максимума
        return maxRows;
    }
    
    else{
        return columnMaxRows;
    }
}

// Удаление пустых ячеек в столбце по параметрам: столбец; максимальное количество непустых строк в столбце
function removeEmptyCells(column, maxRows){
    let rowsNumber = document.querySelectorAll("tr"); // получаем общее количество строк таблицы
    for ( let i = maxRows; i < rowsNumber.length; i++ ){ // для каждой строки от максимальной непустой строки до конца массива
        let columnToSort = rowsNumber[i];
        columnToSort = columnToSort.querySelectorAll("td");
        if (columnToSort[column].innerHTML == "" || columnToSort[column].innerHTML == " "){
            rowsNumber[i].style.display = "none";   
        }  
    }
}

// Показываем основную информацию по работе с таблицей
function showInfo(){
    let modalWindow = document.querySelector('.modal'); // Показываем модальное окно
    modalWindow.style.display = '';
    let overlay = document.querySelector('.overlay'); // Показываем подложку
    overlay.style.display = '';
}

// Закрываем модальное окно информации
function closeModal(){
    let modalWindow = document.querySelector('.modal'); // Убираем модальное окно
    modalWindow.style.display = 'none';
    let overlay = document.querySelector('.overlay'); // Убираем подложку
    overlay.style.display = 'none';
}

// Отрисовка при загрузке страницы
window.onload = function(){
    showInfo();
    saveOldList();
    navigation('first');
}