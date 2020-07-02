// import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it("should be able to list a provider's day's appointments", async () => {
    const appoitment1 = await fakeAppointmentsRepository.create({
      date: new Date(2021, 9, 15, 11),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    const appoitment2 = await fakeAppointmentsRepository.create({
      date: new Date(2021, 9, 15, 14),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });
    const appointments = await listProviderAppointmentsService.execute({
      day: 15,
      month: 10,
      year: 2021,
      provider_id: 'provider_id',
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appoitment1, appoitment2]),
    );
  });
});
