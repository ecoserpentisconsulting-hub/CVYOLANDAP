import React from 'react';

interface SectionHeaderEditBarProps {
  sectionId?: string;
  sectionTitle?: string;
  editTabTarget?: string;
}

// In the final public production version, edit bars are completely disabled
export const SectionHeaderEditBar: React.FC<SectionHeaderEditBarProps> = () => {
  return null;
};
