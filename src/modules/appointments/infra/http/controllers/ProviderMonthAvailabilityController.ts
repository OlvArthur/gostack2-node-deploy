import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;
    const { provider_id } = request.params;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const MonthAvailability = await listProviderMonthAvailability.execute({
      month: Number(month),
      year: Number(year),
      provider_id,
    });

    return response.json(MonthAvailability);
  }
}
