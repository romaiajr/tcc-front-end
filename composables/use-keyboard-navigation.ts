export function useKeyboardNavigation() {
  const focusableElements = ref<HTMLElement[]>([]);
  const menuStore = useMenuOptions();

  const updateFocusableElements = () => {
    focusableElements.value = Array.from(
      document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ) as HTMLElement[];
  };

  const hotkeys = (event: KeyboardEvent) => {
    updateFocusableElements();

    const currentIndex = focusableElements.value.findIndex(
      (el) => el === document.activeElement,
    );

    if (event.code === 'Tab') {
      if (event.shiftKey) {
        const prevIndex = getPrevIndex(
          currentIndex,
          focusableElements.value.length,
        );
        focusableElements.value[prevIndex]?.focus();
      } else {
        const nextIndex = getNextIndex(
          currentIndex,
          focusableElements.value.length,
        );
        focusableElements.value[nextIndex]?.focus();
      }
      event.preventDefault();
    } else if (event.code === 'ArrowUp') {
      const prevIndex = getPrevIndex(
        currentIndex,
        focusableElements.value.length,
      );
      focusableElements.value[prevIndex]?.focus();
      event.preventDefault();
    } else if (event.code === 'ArrowDown') {
      const nextIndex = getNextIndex(
        currentIndex,
        focusableElements.value.length,
      );
      focusableElements.value[nextIndex]?.focus();
      event.preventDefault();
    } else if (event.code === 'Escape') {
      menuStore.setActiveDerMenu(
        menuStore.previousDerMenu ?? menuStore.activeDerMenu,
      );
    }
  };

  function getPrevIndex(currentIndex: number, length: number): number {
    return currentIndex === 0 ? length - 1 : currentIndex - 1;
  }

  function getNextIndex(currentIndex: number, length: number): number {
    return currentIndex === length - 1 ? 0 : currentIndex + 1;
  }

  return { hotkeys };
}
