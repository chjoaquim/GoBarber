import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    try {
      const { appointment } = data;

      await Mail.sendMail({
        to: `${appointment.provider.name} <${appointment.provider.email}>`,
        subject: 'Agendamento Cancelado',
        template: 'cancellation',
        context: {
          provider: appointment.provider.name,
          user: appointment.user.name,
          date: format(
            parseISO(appointment.date),
            "'dia' dd 'de' MMMM', às' H:MM'h'",
            {
              locale: pt,
            }
          ),
        },
      });
    } catch (e) {
      console.log(e);
      process.exit();
    }
  }
}

export default new CancellationMail();
