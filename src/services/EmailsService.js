export function sendEmail(students, competition, dear) {
 
  window.location = "mailto:" + getEmails(students) + "?subject="+  encodeURI("Congratulations on your win in " + competition) + "&body=" + encodeURI("Dear " + dear + ",\nConguratulation on your achievement in " + competition +". This achievement is deeply appreciated by the unversity and we will announce it in the approbrite medias.\nIn case you have Photos you want to share with the news post, reply to this email with the photos.\nRegards and Congrats,\nKFUPM News Team");
 }

export function getEmails(students) {


    let emails = [];
      students.forEach(student => {
        emails.push("s" + student.stId + "@kfupm.edu.sa")
      });
      return emails.join(",");
  }