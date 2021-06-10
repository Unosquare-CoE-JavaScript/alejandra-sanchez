var currentEnrollment = [410, 105, 664, 375];

var studentRecords = [
	{ id: 313, name: 'Frank', paid: true },
	{ id: 410, name: 'Suzy', paid: true },
	{ id: 709, name: 'Brian', paid: false },
	{ id: 105, name: 'Henry', paid: false },
	{ id: 502, name: 'Mary', paid: true },
	{ id: 664, name: 'Bob', paid: false },
	{ id: 250, name: 'Peter', paid: true },
	{ id: 375, name: 'Sarah', paid: true },
	{ id: 867, name: 'Greg', paid: false },
];

function getStudentFromId(studentId) {
	return studentRecords.find((record) => record.id == studentId);
}

function studentObjects(ids) {
	const Roll = [];
	ids.forEach(element => Roll.push(getStudentFromId(element)));
	return Roll;
}

function studentsId(args) {
	const arrStudents = [];
	args.map(element => arrStudents.push(element.id))
	return arrStudents;
}

function printRecords(recordIds) {
	// TODO
	let ids = recordIds;
	function sortStudents() {
		var sortStudents = studentObjects(ids).sort(function (a, b) {
			if (a.name > b.name) {
				return 1;
			}
			if (a.name < b.name) {
				return -1;
			}
			// a must be equal to b
			return 0;
		});
		return sortStudents;
	}

	return sortStudents().map(function final(element) {
		if (element.paid) {
			return `${element.name} (${element.id}): Paid`;
		}
		else return `${element.name} (${element.id}): Not paid`;
	});
}
////////////////
function paidStudentsToEnroll() {
	let paidStudents = studentRecords.filter(paidStatus => paidStatus.paid == true);

	let unrolledStudents = studentsId(paidStudents).filter(
		(e) => !currentEnrollment.includes(e));

	return unrolledStudents.concat(currentEnrollment);
}

function remindUnpaid(recordIds) {
	// TODO
	studentObjects(recordIds);
	let notPaid = studentObjects(currentEnrollment).filter(paidStatus => paidStatus.paid == false);
	return printRecords(studentsId(notPaid));
}

// ********************************


printRecords(currentEnrollment);
console.log('----');
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log('----');
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
