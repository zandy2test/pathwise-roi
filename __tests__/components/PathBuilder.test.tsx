import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import PathBuilder from '@/components/path-builder';
import { CalculatorInputs } from '@/lib/types';

// Mock the data functions
jest.mock('@/lib/data', () => ({
  locationMultipliers: {
    nyc: 1.5,
    sf: 1.6,
    chicago: 1.2,
  },
  schoolTiers: {
    public: { name: 'Public/In-State', multiplier: 1 },
    private: { name: 'Private', multiplier: 2.5 },
    elite: { name: 'Elite/Ivy League', multiplier: 4 },
  },
  livingCosts: {
    oncampus: { name: 'On Campus', cost: 12000 },
    offcampus: { name: 'Off Campus', cost: 10000 },
    withparents: { name: 'With Parents', cost: 3000 },
  },
  getEducationTypeOptions: () => [
    { value: 'traditional', label: 'Traditional College' },
    { value: 'tradeschool', label: 'Trade School' },
    { value: 'bootcamp', label: 'Bootcamp' },
  ],
  getFieldOptions: (type: string) => {
    if (type === 'traditional') {
      return [
        { value: 'computer_science', label: 'Computer Science' },
        { value: 'business', label: 'Business' },
      ];
    }
    if (type === 'tradeschool') {
      return [
        { value: 'electrical', label: 'Electrical' },
        { value: 'plumbing', label: 'Plumbing' },
      ];
    }
    return [];
  },
  getProgramOptions: (type: string, field: string) => {
    if (type === 'traditional' && field === 'computer_science') {
      return [
        { value: 'bachelors', label: "Bachelor's Degree" },
        { value: 'masters', label: "Master's Degree" },
      ];
    }
    if (type === 'tradeschool' && field === 'electrical') {
      return [
        { value: 'certification', label: 'Certification' },
        { value: 'associate', label: 'Associate Degree' },
      ];
    }
    return [];
  },
  buildPathKey: (type: string, field: string, program: string) => {
    return `${type}_${field}_${program}`;
  },
  getPathFromMapping: (path: string) => {
    const parts = path.split('_');
    if (parts.length === 3) {
      return {
        type: parts[0],
        field: parts[1],
        program: parts[2],
      };
    }
    return null;
  },
}));

describe('PathBuilder Component', () => {
  const defaultInputs: CalculatorInputs = {
    path: '',
    location: '',
    schoolTier: '',
    livingCost: '',
    scholarships: 0,
    educationType: '',
    field: '',
    program: '',
  };

  const mockSetInputs = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<PathBuilder inputs={defaultInputs} setInputs={mockSetInputs} />);

      expect(screen.getByText('Education Path')).toBeInTheDocument();
      expect(screen.getByText('Select your education and personal details')).toBeInTheDocument();
      // Check labels exist (Radix UI doesn't associate them directly with selects)
      expect(screen.getByText('Education Type')).toBeInTheDocument();
      expect(screen.getByText('Your Location')).toBeInTheDocument();
      expect(screen.getByText('School Quality')).toBeInTheDocument();
      expect(screen.getByText('Living Situation')).toBeInTheDocument();
      // Check select triggers exist
      expect(screen.getByText('Select education type')).toBeInTheDocument();
      expect(screen.getByText('Select location')).toBeInTheDocument();
      expect(screen.getByText('Select school tier')).toBeInTheDocument();
      expect(screen.getByText('Select living situation')).toBeInTheDocument();
    });

    it('should render with custom title and description', () => {
      render(
        <PathBuilder
          inputs={defaultInputs}
          setInputs={mockSetInputs}
          title="Custom Title"
          description="Custom Description"
        />
      );

      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom Description')).toBeInTheDocument();
    });

    it('should display errors when provided', () => {
      const errors = ['Error 1', 'Error 2'];
      render(<PathBuilder inputs={defaultInputs} setInputs={mockSetInputs} errors={errors} />);

      expect(screen.getByText('Error 1')).toBeInTheDocument();
      expect(screen.getByText('Error 2')).toBeInTheDocument();
    });
  });

  describe('Education Type Selection', () => {
    it('should show education type options when clicked', () => {
      render(<PathBuilder inputs={defaultInputs} setInputs={mockSetInputs} />);

      const educationTypeSelect = screen.getByText('Select education type');
      fireEvent.click(educationTypeSelect);

      expect(screen.getByText('Traditional College')).toBeInTheDocument();
      expect(screen.getByText('Trade School')).toBeInTheDocument();
      expect(screen.getByText('Bootcamp')).toBeInTheDocument();
    });

    it('should update inputs when education type is selected', async () => {
      render(<PathBuilder inputs={defaultInputs} setInputs={mockSetInputs} />);

      const educationTypeSelect = screen.getByText('Select education type');
      fireEvent.click(educationTypeSelect);

      const traditionalOption = screen.getByText('Traditional College');
      fireEvent.click(traditionalOption);

      await waitFor(() => {
        expect(mockSetInputs).toHaveBeenCalledWith(
          expect.objectContaining({
            educationType: 'traditional',
            field: '',
            program: '',
            path: '',
          })
        );
      });
    });
  });

  describe('Cascading Selections', () => {
    it('should show field options after education type is selected', () => {
      const inputsWithType = {
        ...defaultInputs,
        educationType: 'traditional',
      };

      render(<PathBuilder inputs={inputsWithType} setInputs={mockSetInputs} />);

      // Check label exists (not directly associated with select in Radix UI)
      expect(screen.getByText('Field of Study')).toBeInTheDocument();

      const fieldSelect = screen.getByText('Select field of study');
      fireEvent.click(fieldSelect);

      expect(screen.getByText('Computer Science')).toBeInTheDocument();
      expect(screen.getByText('Business')).toBeInTheDocument();
    });

    it('should show program options after field is selected', () => {
      const inputsWithTypeAndField = {
        ...defaultInputs,
        educationType: 'traditional',
        field: 'computer_science',
      };

      render(<PathBuilder inputs={inputsWithTypeAndField} setInputs={mockSetInputs} />);

      // Check label exists (not directly associated with select in Radix UI)
      expect(screen.getByText('Program/Degree')).toBeInTheDocument();

      const programSelect = screen.getByText('Select program');
      fireEvent.click(programSelect);

      expect(screen.getByText("Bachelor's Degree")).toBeInTheDocument();
      expect(screen.getByText("Master's Degree")).toBeInTheDocument();
    });

    it('should reset field and program when education type changes', async () => {
      const inputsWithSelections = {
        ...defaultInputs,
        educationType: 'traditional',
        field: 'computer_science',
        program: 'bachelors',
      };

      const { rerender } = render(
        <PathBuilder inputs={inputsWithSelections} setInputs={mockSetInputs} />
      );

      // Change education type - click on the select trigger which shows current value
      // Since we have educationType set, it should show "Traditional College"
      const educationTypeSelect = screen.getByText('Traditional College');
      fireEvent.click(educationTypeSelect);

      const tradeSchoolOption = screen.getByText('Trade School');
      fireEvent.click(tradeSchoolOption);

      await waitFor(() => {
        expect(mockSetInputs).toHaveBeenCalledWith(
          expect.objectContaining({
            educationType: 'tradeschool',
            field: '',
            program: '',
            path: '',
          })
        );
      });
    });
  });

  describe('Location Selection', () => {
    it('should display formatted location names', () => {
      render(<PathBuilder inputs={defaultInputs} setInputs={mockSetInputs} />);

      const locationSelect = screen.getByText('Select location');
      fireEvent.click(locationSelect);

      expect(screen.getByText('New York City')).toBeInTheDocument();
      expect(screen.getByText('San Francisco')).toBeInTheDocument();
      expect(screen.getByText('Chicago')).toBeInTheDocument();
    });

    it('should update location when selected', async () => {
      render(<PathBuilder inputs={defaultInputs} setInputs={mockSetInputs} />);

      const locationSelect = screen.getByText('Select location');
      fireEvent.click(locationSelect);

      const nycOption = screen.getByText('New York City');
      fireEvent.click(nycOption);

      await waitFor(() => {
        expect(mockSetInputs).toHaveBeenCalledWith(
          expect.objectContaining({
            location: 'nyc',
          })
        );
      });
    });
  });

  describe('School Tier Selection', () => {
    it('should display school tier options', () => {
      render(<PathBuilder inputs={defaultInputs} setInputs={mockSetInputs} />);

      const schoolTierSelect = screen.getByText('Select school tier');
      fireEvent.click(schoolTierSelect);

      expect(screen.getByText('Public/In-State')).toBeInTheDocument();
      expect(screen.getByText('Private')).toBeInTheDocument();
      expect(screen.getByText('Elite/Ivy League')).toBeInTheDocument();
    });
  });

  describe('Living Cost Selection', () => {
    it('should display living cost options', () => {
      render(<PathBuilder inputs={defaultInputs} setInputs={mockSetInputs} />);

      const livingCostSelect = screen.getByText('Select living situation');
      fireEvent.click(livingCostSelect);

      expect(screen.getByText('On Campus')).toBeInTheDocument();
      expect(screen.getByText('Off Campus')).toBeInTheDocument();
      expect(screen.getByText('With Parents')).toBeInTheDocument();
    });
  });

  describe('Scholarships Input', () => {
    it('should accept numeric input for scholarships', () => {
      render(<PathBuilder inputs={defaultInputs} setInputs={mockSetInputs} />);

      const scholarshipInput = screen.getByPlaceholderText('0');

      // Simulate typing directly with a change event
      fireEvent.change(scholarshipInput, { target: { value: '5000' } });

      // The onChange should have been called
      expect(mockSetInputs).toHaveBeenCalledWith(
        expect.objectContaining({
          scholarships: 5000,
        })
      );
    });

    it('should display maximum scholarship amount hint in tooltip', () => {
      render(
        <PathBuilder inputs={{ ...defaultInputs, scholarships: 0 }} setInputs={mockSetInputs} />
      );

      // The maximum scholarship amount is in the tooltip content
      const input = screen.getByTestId('scholarships-input');
      expect(input).toHaveAttribute('max', '100000');
    });
  });

  describe('Path Building', () => {
    it('should build path key when all selections are made', async () => {
      const { rerender } = render(<PathBuilder inputs={defaultInputs} setInputs={mockSetInputs} />);

      // Select education type
      const educationTypeSelect = screen.getByText('Select education type');
      fireEvent.click(educationTypeSelect);
      fireEvent.click(screen.getByText('Traditional College'));

      // Update props to reflect the change
      const updatedInputs1 = { ...defaultInputs, educationType: 'traditional' };
      rerender(<PathBuilder inputs={updatedInputs1} setInputs={mockSetInputs} />);

      // Select field
      const fieldSelect = screen.getByText('Select field of study');
      fireEvent.click(fieldSelect);
      fireEvent.click(screen.getByText('Computer Science'));

      // Update props to reflect the change
      const updatedInputs2 = { ...updatedInputs1, field: 'computer_science' };
      rerender(<PathBuilder inputs={updatedInputs2} setInputs={mockSetInputs} />);

      // Select program
      const programSelect = screen.getByText('Select program');
      fireEvent.click(programSelect);
      fireEvent.click(screen.getByText("Bachelor's Degree"));

      await waitFor(() => {
        expect(mockSetInputs).toHaveBeenCalledWith(
          expect.objectContaining({
            program: 'bachelors',
            path: 'traditional_computer_science_bachelors',
          })
        );
      });
    });
  });

  describe('Initial Path Loading', () => {
    it('should initialize selections from existing path', () => {
      const inputsWithPath = {
        ...defaultInputs,
        path: 'traditional_computer_science_bachelors',
        educationType: 'traditional',
        field: 'computer_science',
        program: 'bachelors',
      };

      render(<PathBuilder inputs={inputsWithPath} setInputs={mockSetInputs} />);

      // Check that labels exist (not associated with selects in Radix UI)
      expect(screen.getByText('Education Type')).toBeInTheDocument();
      expect(screen.getByText('Field of Study')).toBeInTheDocument();
      expect(screen.getByText('Program/Degree')).toBeInTheDocument();

      // Check that the values are displayed in the select triggers
      expect(screen.getByText('Traditional College')).toBeInTheDocument();
      expect(screen.getByText('Computer Science')).toBeInTheDocument();
      expect(screen.getByText("Bachelor's Degree")).toBeInTheDocument();
    });
  });
});
