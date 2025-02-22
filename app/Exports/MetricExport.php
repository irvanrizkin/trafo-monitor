<?php

namespace App\Exports;

use App\Models\AmbientTemperature;
use App\Models\ApparentPower;
use App\Models\Current;
use App\Models\Frequency;
use App\Models\IHDCurrentV2;
use App\Models\IHDVoltageV2;
use App\Models\KFactor;
use App\Models\OilLevel;
use App\Models\Power;
use App\Models\PowerFactor;
use App\Models\Pressure;
use App\Models\ReactivePower;
use App\Models\Temperature;
use App\Models\THDCurrent;
use App\Models\THDVoltage;
use App\Models\Voltage;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Concerns\WithTitle;

class MetricExport implements WithMultipleSheets
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function sheets(): array
    {
        return [
            // VIF
            new VoltageSheet($this->trafoId, $this->date),
            new CurrentSheet($this->trafoId, $this->date),
            new FrequencySheet($this->trafoId, $this->date),
            // PQSPF
            new ActivePowerSheet($this->trafoId, $this->date),
            new ReactivePowerSheet($this->trafoId, $this->date),
            new ApparentPowerSheet($this->trafoId, $this->date),
            new PowerFactorSheet($this->trafoId, $this->date),
            // THD
            new THDCurrentSheet($this->trafoId, $this->date),
            new THDVoltageSheet($this->trafoId, $this->date),
            // IHD
            new IHDVoltageSheet($this->trafoId, $this->date),
            new IHDCurrentSheet($this->trafoId, $this->date),
            // TPO
            new OilTemperatureSheet($this->trafoId, $this->date),
            new PressureSheet($this->trafoId, $this->date),
            new OilLevelSheet($this->trafoId, $this->date),
            new AmbientTemperatureSheet($this->trafoId, $this->date),
            // PKA
            new KFactorSheet($this->trafoId, $this->date),
        ];
    }
}

class VoltageSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return Voltage::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'Voltage';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "Voltage R",
            "Voltage S",
            "Voltage T",
            "created_at",
            "updated_at"
        ];
    }
}

class CurrentSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return Current::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'Current';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "Current R",
            "Current S",
            "Current T",
            "Current IN",
            "created_at",
            "updated_at"
        ];
    }
}

class FrequencySheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return Frequency::select('id', 'trafo_id', 'topic_name', 'frequency_r', 'created_at', 'updated_at')
            ->where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'Frequency';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "Frequency",
            "created_at",
            "updated_at"
        ];
    }
}

class ActivePowerSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return Power::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'Active Power';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "Active Power R",
            "Active Power S",
            "Active Power T",
            "created_at",
            "updated_at"
        ];
    }
}

class ReactivePowerSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return ReactivePower::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'Reactive Power';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "Reactive Power R",
            "Reactive Power S",
            "Reactive Power T",
            "created_at",
            "updated_at"
        ];
    }
}

class ApparentPowerSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return ApparentPower::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'Apparent Power';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "Apparent Power R",
            "Apparent Power S",
            "Apparent Power T",
            "created_at",
            "updated_at"
        ];
    }
}

class PowerFactorSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return PowerFactor::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'Power Factor';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "Power Factor R",
            "Power Factor S",
            "Power Factor T",
            "created_at",
            "updated_at"
        ];
    }
}

class THDCurrentSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return THDCurrent::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'THD Current';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "THD Current R",
            "THD Current S",
            "THD Current T",
            "created_at",
            "updated_at"
        ];
    }
}

class THDVoltageSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return THDVoltage::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'THD Voltage';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "THD Voltage R",
            "THD Voltage S",
            "THD Voltage T",
            "created_at",
            "updated_at"
        ];
    }
}

class IHDVoltageSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return IHDVoltageV2::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'IHD Voltage';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "Voltage R H1",
            "Voltage S H1",
            "Voltage T H1",
            "Voltage R H3",
            "Voltage S H3",
            "Voltage T H3",
            "Voltage R H5",
            "Voltage S H5",
            "Voltage T H5",
            "Voltage R H7",
            "Voltage S H7",
            "Voltage T H7",
            "Voltage R H9",
            "Voltage S H9",
            "Voltage T H9",
            "Voltage R H11",
            "Voltage S H11",
            "Voltage T H11",
            "Voltage R H13",
            "Voltage S H13",
            "Voltage T H13",
            "Voltage R H15",
            "Voltage S H15",
            "Voltage T H15",
            "Voltage R H17",
            "Voltage S H17",
            "Voltage T H17",
            "Voltage R H19",
            "Voltage S H19",
            "Voltage T H19",
            "created_at",
            "updated_at"
        ];
    }
}

class IHDCurrentSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return IHDCurrentV2::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'IHD Current';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "Current R H1",
            "Current S H1",
            "Current T H1",
            "Current R H3",
            "Current S H3",
            "Current T H3",
            "Current R H5",
            "Current S H5",
            "Current T H5",
            "Current R H7",
            "Current S H7",
            "Current T H7",
            "Current R H9",
            "Current S H9",
            "Current T H9",
            "Current R H11",
            "Current S H11",
            "Current T H11",
            "Current R H13",
            "Current S H13",
            "Current T H13",
            "Current R H15",
            "Current S H15",
            "Current T H15",
            "Current R H17",
            "Current S H17",
            "Current T H17",
            "Current R H19",
            "Current S H19",
            "Current T H19",
            "created_at",
            "updated_at"
        ];
    }
}

class OilTemperatureSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return Temperature::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'Oil Temperature';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "Oil Temperature",
            "created_at",
            "updated_at"
        ];
    }
}

class PressureSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return Pressure::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'Pressure';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "Pressure",
            "created_at",
            "updated_at"
        ];
    }
}

class OilLevelSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return OilLevel::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'Oil Level';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "Oil Level",
            "created_at",
            "updated_at"
        ];
    }
}

class AmbientTemperatureSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return AmbientTemperature::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'Ambient Temperature';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "Ambient Temperature",
            "created_at",
            "updated_at"
        ];
    }
}

class KFactorSheet implements FromCollection, WithTitle, WithHeadings, WithStrictNullComparison
{
    protected $trafoId;
    protected $date;

    public function __construct(int $trafoId, string $date)
    {
        $this->trafoId = $trafoId;
        $this->date = $date;
    }

    public function collection()
    {
        return KFactor::where('trafo_id', $this->trafoId)->whereDate('created_at', $this->date)->get();
    }

    public function title(): string
    {
        return 'K Factor';
    }

    public function headings(): array
    {
        return [
            'ID',
            "Trafo ID",
            "Topic Name",
            "K Factor R",
            "K Factor S",
            "K Factor T",
            "created_at",
            "updated_at"
        ];
    }
}
