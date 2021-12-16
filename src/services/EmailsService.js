export function sendEmail(students, competition, dear) {
 
  window.location = encodeURIComponent("mailto:" + getEmails(students) + "?subject=Congratulations on achieving a win in "+competition+"&body=Dear%20"+dear+"%2C%0D%0A%0D%0AConguratulations%20on%20your%20achievement%20in%20"+competition+".%20This%20achievement%20is%20deeply%20appreciated%20by%20the%20unversity%20and%20we%20will%20announce%20it%20in%20the%20approbrite%20medias.%0D%0A%0D%0AIn%20case%20you%20have%20Photos%20you%20want%20to%20share%20with%20the%20news%20post%2C%20reply%20to%20this%20email%20with%20the%20photos.%0D%0A%0D%0ARegards%20and%20Congrats%2C%0D%0AKFUPM%20News%20Team%0D%0A");
 }

export function getEmails(students) {


    let emails = [];
      students.forEach(student => {
        emails.push("s" + student.stId + "@kfupm.edu.sa")
      });
      return emails.join(",");
  }