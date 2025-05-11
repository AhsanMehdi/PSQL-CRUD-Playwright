/*
  - import dependencies
  - methods available in db-config-file
*/
import { test, expect } from '@playwright/test';
import {
  create_facilities_table,
  insert_facility,
  read_facility,
  update_facility_name,
  delete_facility,
  disconnect_db
} from '../database/db-ops';

// hook to create table first
test.beforeAll(async () => {
  await create_facilities_table(); // Create table before tests
});

// hook to disconnect database
test.afterAll(async () => {
  await disconnect_db(); // Disconnect from DB after all tests
});
// test to perform operations
test('CRUD operations on cd.facilities table', async () => {
  const test_facility = {
    facid: 101,
    name: 'Mehdi',
    membercost: 100,
    guestcost: 150,
    initialoutlay: 5000,
    monthlymaintenance: 300,
  };

  // insert a new facility
  await insert_facility(test_facility);

  // verify the facility was inserted correctly
  const inserted = await read_facility(test_facility.facid);
  expect(inserted.name).toBe('Mehdi');

  // edit the facility name
  await update_facility_name(test_facility.facid, 'Mehdi');
  const updated = await read_facility(test_facility.facid);
  expect(updated.name).toBe('Mehdi');

  // delete the facility
  await delete_facility(test_facility.facid);
  const deleted = await read_facility(test_facility.facid);
  // database assetion to verify that object has been deleted successfully
  expect(deleted).toBeUndefined();  
});
