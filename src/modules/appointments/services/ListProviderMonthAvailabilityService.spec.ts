// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list a provider`s month availability ', async () => {
    const bookedHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    bookedHours.map(async hour => {
      await fakeAppointmentsRepository.create({
        user_id: 'user_id',
        provider_id: 'provider_id',
        date: new Date(2020, 4, 20, hour, 0, 0),
      });
    });

    bookedHours.map(async hour => {
      await fakeAppointmentsRepository.create({
        user_id: 'user_id',
        provider_id: 'provider_id',
        date: new Date(2020, 4, 21, hour, 0, 0),
      });
    });

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'provider_id',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 10, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 25, available: true },
      ]),
    );
  });
});
