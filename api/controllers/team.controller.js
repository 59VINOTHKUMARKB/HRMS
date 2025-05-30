import {
  getAllTeams,
  createNewTeam,
  updateTeamById,
  deleteTeamById,
} from "../actions/team.action.js";

// @desc    Get teams for a department
// @route   GET /api/teams?departmentId=
// @access  HR
export const getTeams = async (req, res, next) => {
  try {
    const { departmentId } = req.query;
    // If manager, only their teams
    const managerId = req.user.role === 'MANAGER' ? req.user.id : undefined;
    const teams = await getAllTeams({ departmentId, managerId });
    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new team
// @route   POST /api/teams
// @access  HR
export const createTeam = async (req, res, next) => {
  try {
    const team = await createNewTeam(req.body);
    res.status(201).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
};

// @desc    Update team
// @route   PUT /api/teams/:id
// @access  HR
export const updateTeam = async (req, res, next) => {
  try {
    const team = await updateTeamById(req.params.id, req.body);
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete team
// @route   DELETE /api/teams/:id
// @access  HR
export const deleteTeam = async (req, res, next) => {
  try {
    const result = await deleteTeamById(req.params.id);
    res.status(200).json({ success: true, message: "Team deleted" });
  } catch (error) {
    next(error);
  }
}; 