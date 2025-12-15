let reminders = [];
let tab_color = [-1,-1];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
let num_reminder = 0;


window.onload = function () {
    const dateInput = document.getElementById("text-box2");
    num_reminder = 0;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    dateInput.value = formattedDate;

    const stored = localStorage.getItem("reminders");
    reminders = JSON.parse(stored) || [];
    if(stored){
        for (const item of reminders) {
            addReminderElement(item.text, item.date);
            //if(item.date === formattedDate){this.alert("hkjkjdsjk");}
        }

    }
    //update calender date
    this.document.getElementById("calDate").textContent = monthNames[today.getMonth()];

    const tab = document.getElementById("calender");
    const descr = this.document.getElementById("dayAct");

    for (let i = 2; i < tab.rows.length; i++) {
        const row = tab.rows[i];
        for (let n = 0; n < row.cells.length; n++) {
            const cell = row.cells[n];
            if(cell.textContent.length != 0){
                cell.addEventListener("click", function () {
                cell.style.backgroundColor = "rgb(119,176,12)";
                if(tab_color[0] != -1 || tab_color[0] == n && tab_color[1] == i){
                    const reset = tab.rows[tab_color[0]].cells[tab_color[1]];
                    reset.style.backgroundColor = "white";
                }
                tab_color[0] = i;
                tab_color[1] = n;
                
                    const currentMonthName = document.getElementById("calDate").textContent;
                    const monthIndex = monthNames.indexOf(currentMonthName);
                    const today = new Date();
                    const yyyy = today.getFullYear();
                    const mm = String(monthIndex + 1).padStart(2, '0');
                    const dd =  cell.textContent.padStart(2, '0');
                    const clickedDate = `${yyyy}-${mm}-${dd}`;

                    //finding the dates that match
                    const matches = reminders.filter(r => r.date === clickedDate);
                    

                    if(matches.length > 0){

                        const reminderTexts = matches.map(match => match.text);
                        descr.textContent = `Reminders for \n ${clickedDate}: \n ${reminderTexts}`;

                    }
                    else{
                        descr.textContent = `Reminders for \n ${clickedDate}: \n no active days present today.`
                    }


            });
        }
    }
}





};

function nextMonth(){
    for (let index = 0; index < monthNames.length; index++) {
        if (document.getElementById("calDate").textContent === monthNames[index]) {
            if(index+1 == monthNames.length){index = 0;}
            document.getElementById("calDate").textContent = monthNames[index+1];
            break;
        }
    }
}


function prevMonth(){
    for (let index = 0; index < monthNames.length; index++) {
        if (document.getElementById("calDate").textContent === monthNames[index]) {
            if(index-1 <= 0){index = monthNames.length;}
            document.getElementById("calDate").textContent = monthNames[index-1];
            break;
        }
    }
}


function addReminderElement(text, dateStr) {
    const rem = document.createElement("button");
    const date = document.createElement("li");

    rem.textContent = text;
    rem.style.backgroundColor = "rgb(110, 176, 12)";
    rem.style.display = "block";
    rem.classList.add("add");

    rem.addEventListener("mouseover", function () {
        rem.style.backgroundColor = "rgba(223, 36, 36, 1)";
        date.style.backgroundColor = "rgba(223, 36, 36, 1)";
    });
    rem.addEventListener("mouseleave", function () {
        rem.style.backgroundColor = "rgb(110, 176, 12)";
        date.style.backgroundColor = "rgb(110, 176, 12)";
    });
    rem.addEventListener("click", function () {
        rem.remove();
        date.remove();

        reminders = reminders.filter(item => !(item.text === text && item.date === dateStr));
        localStorage.setItem("reminders", JSON.stringify(reminders));
    });

    date.textContent = dateStr;
    date.style.backgroundColor = "rgb(110, 176, 12)";



    document.getElementById("reminder-list").appendChild(rem);
    document.getElementById("date-list").appendChild(date);
    
}


function addItem(){
    let input = document.getElementById("text-box").value;
    let input2 = document.getElementById("text-box2").value;

    if (input.length == 0){document.getElementById("text-box").value = "ERROR: EMPTY";} 
    else if (input.length < 90) {
        const rem = document.createElement("button");
        const date = document.createElement("li");
    
        
        rem.textContent = input;
        rem.style.backgroundColor = "rgb(110, 176, 12)";
        rem.style.display = "block";
        rem.classList.add("add");

        rem.addEventListener("mouseover", function(){
            rem.style.backgroundColor = "rgba(223, 36, 36, 1)";
            date.style.backgroundColor = "rgba(223, 36, 36, 1)";
            
        })
        rem.addEventListener("mouseleave", function(){
            rem.style.backgroundColor = "rgb(110, 176, 12)";
            date.style.backgroundColor = "rgb(110, 176, 12)";
        })
        rem.addEventListener("click", function(){
            rem.remove();
            date.remove();
            reminders = reminders.filter(item => !(item.text === input && item.date === input2));
            localStorage.setItem("reminders", JSON.stringify(reminders));
        });


        date.addEventListener("mouseover", function(){
            date.style.backgroundColor = "rgba(223, 36, 36, 1)";
        })
        date.addEventListener("mouseleave", function(){
            date.style.backgroundColor = "rgb(110, 176, 12)";
        })
        


        date.textContent = input2;
        date.style.backgroundColor = "rgb(110, 176, 12)";


        document.getElementById("reminder-list").appendChild(rem);
        document.getElementById("date-list").appendChild(date);
        document.getElementById("text-box").value = "";

        reminders.push({text: input, date: input2});
        localStorage.setItem("reminders",JSON.stringify(reminders));

    }
    else{
        document.getElementById("text-box").value = "ERROR: STRING TO LONG";
    }

}
