var deepJS = defineWorkshop()

deepJS.addStudent(311,"Frank",/*paid=*/true);
deepJS.addStudent(410,"Suzy",/*paid=*/true);
deepJS.addStudent(709,"Brian",/*paid=*/false);
deepJS.addStudent(105,"Henry",/*paid=*/false);
deepJS.addStudent(502,"Mary",/*paid=*/true);
deepJS.addStudent(664,"Bob",/*paid=*/false);
deepJS.addStudent(250,"Peter",/*paid=*/true);
deepJS.addStudent(375,"Sarah",/*paid=*/true);
deepJS.addStudent(867,"Greg",/*paid=*/false);

deepJS.enrollStudent(410);
deepJS.enrollStudent(105);
deepJS.enrollStudent(664);
deepJS.enrollStudent(375);

deepJS.printCurrentEnrollment();
console.log("----");
deepJS.enrollPaidStudents();
console.log("----");
deepJS.remindUnpaidStudents();

// ********************************
function defineWorkshop(){
    var currentEnrollment = []
    var studentRecords = []

    return {
        addStudent: function(id,name,paid){
              studentRecords.push({id: id, name: name, paid: paid}) 
        },

        enrollStudent: function(id){
            currentEnrollment.push(id)
        },

        printCurrentEnrollment: function(){
            return printRecords(currentEnrollment)
        },

        enrollPaidStudents: function (){
            currentEnrollment = paidStudentsToEnroll()
            return printRecords(currentEnrollment)
        },

        remindUnpaidStudents: function(){
            return remindUnpaid(currentEnrollment)
        }

    }

    function getStudentFromId(studentId) {
        return studentRecords.find(matchId);
    
        // *************************
    
        function matchId(record) {
            return (record.id == studentId);
        }
    }
    
    function printRecords(recordIds) {
        var records = recordIds.map(getStudentFromId);
    
        records.sort(sortByNameAsc);
    
        records.forEach(printRecord);
    }
    
    function sortByNameAsc(record1,record2){
        if (record1.name < record2.name) return -1;
        else if (record1.name > record2.name) return 1;
        else return 0;
    }
    
    function printRecord(record) {
        console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
    }
    
    function paidStudentsToEnroll() {
        var recordsToEnroll = studentRecords.filter(needToEnroll);
    
        var idsToEnroll = recordsToEnroll.map(getStudentId);
    
        return [ ...currentEnrollment, ...idsToEnroll ];
    }
    
    function needToEnroll(record) {
        return (record.paid && !currentEnrollment.includes(record.id));
    }
    
    function getStudentId(record) {
        return record.id;
    }
    
    function remindUnpaid(recordIds) {
        var unpaidIds = recordIds.filter(notYetPaid);
    
        printRecords(unpaidIds);
    }
    
    function notYetPaid(studentId) {
        var record = getStudentFromId(studentId);
        return !record.paid;
    }

}
