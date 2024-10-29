export default defineNuxtRouteMiddleware((to) => {
  const device = useDevice();
  const desktopRoutes: string[] = [Routes.WELCOME, Routes.HOME];

  if (device.isMobile) {
    if (!to.path.includes('mobile')) {
      return navigateTo(Routes.MOBILE);
    }
  } else if (!desktopRoutes.includes(to.path)) {
    return navigateTo(Routes.WELCOME);
  }
});
