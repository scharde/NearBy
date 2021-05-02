interface INotificatonModel {
  id: string;
  title: string;
  message: string;
}

const Notifications = [
  {
    id: "1",
    title: "Covid 19 Testing Center",
    message: "New covid center is open near manewada",
  },
  {
    id: "2",
    title: "Remedivisir injection is available",
    message:
      "Injection is availeble at Govt Covid hospitals, Center govt provided 50 thousand doses",
  },
  {
    id: "3",
    title: "Shaila Hardware is open all days",
    message:
      "Govt has given us special permission, so we are open all days. But necessary is 1. Only person earing mask is allowed. ",
  },
] as INotificatonModel[];

export default Notifications;

export { INotificatonModel };
