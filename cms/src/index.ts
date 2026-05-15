import type { Core } from '@strapi/strapi';
import { seedLandingPage } from './seed/landing-page';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const action = 'api::landing-page.landing-page.find';
      const existing = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action, role: publicRole.id } });

      if (!existing) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action, role: publicRole.id },
        });
        strapi.log.info(`Granted public access to ${action}`);
      }
    }

    await seedLandingPage(strapi);
  },
};
