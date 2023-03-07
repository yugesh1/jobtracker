import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJob, deleteJob, editJob } from "../thunks/jobSlice";

enum EJobType {
  FULLTIME = "full-time",
  PARTTIME = "part-time",
  REMOTE = "remote",
  INTERNSHIP = "internship",
}

export enum EStatus {
  INTERVIEW = "interview",
  DECLINED = "declined",
  PENDING = "pending",
}

interface IInitialState {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: EJobType[];
  jobType: string;
  statusOptions: EStatus[];
  status: string;
  isEditing: boolean;
  editJobId: string;
}

const initialState: IInitialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: [
    EJobType.FULLTIME,
    EJobType.PARTTIME,
    EJobType.REMOTE,
    EJobType.INTERNSHIP,
  ],
  jobType: "full-time",
  statusOptions: [EStatus.INTERVIEW, EStatus.DECLINED, EStatus.PENDING],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (
      state,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
    builder
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Jobs Modified");
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });

    builder
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
