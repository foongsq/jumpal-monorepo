import { useState } from 'react';
import { useAuth } from '../../hooks';
import { freestyleComponent } from '../../constants';

export default function useFreestyleController() {
  const [user, loading] = useAuth();
  const [componentRendered, setComponentRendered] =
      useState(freestyleComponent.SKILLSLIST);

  const toggleComponent = (event, newComponent) => {
    if (newComponent) {
      setComponentRendered(newComponent);
    }
  };

  return [user, loading, componentRendered, toggleComponent];
}
